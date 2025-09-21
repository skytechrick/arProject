'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
    Upload,
    Sparkles,
    DollarSign,
    Tag,
    BookOpen,
    Camera,
    Instagram,
    Facebook,
    Loader2,
    Eye,
    RefreshCw,
    MapPin,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { GeminiClientService } from '@/lib/gemini-client';

const AddNewProduct = () => {
    const geminiService = useMemo(() => new GeminiClientService(), []);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        location: 'India',
        category: '',
        images: [],
        imageUrl: '',
        tags: [],
        story: '',
        storyWordCount: 300
    });

    const [aiFeatures, setAiFeatures] = useState({
        isGeneratingTags: false,
        isGeneratingPrice: false,
        isGeneratingStory: false,
        isGeneratingImage: false,
        isGeneratingSocialPost: false,
        generatedPrompt: '',
        priceAnalysis: null,
        socialPosts: {
            instagram: null,
            facebook: null
        },
        generatedImage: null
    });

    const [socialPreview, setSocialPreview] = useState({
        platform: null,
        isVisible: false
    });

    // AI Tag Generation
    const generateTags = async () => {
        if (!formData.name || !formData.description) {
            alert('Please enter product name and description first');
            return;
        }

        setAiFeatures(prev => ({ ...prev, isGeneratingTags: true }));

        try {
            const tags = await geminiService.generateTags(formData.name, formData.description);
            setFormData(prev => ({ ...prev, tags }));
        } catch (error) {
            console.error('Error generating tags:', error);
            alert('Failed to generate tags. Please try again.');
        } finally {
            setAiFeatures(prev => ({ ...prev, isGeneratingTags: false }));
        }
    };

    // AI Price Optimization
    const optimizePrice = async () => {
        if (!formData.description || !formData.location) {
            alert('Please enter product description and location first');
            return;
        }

        setAiFeatures(prev => ({ ...prev, isGeneratingPrice: true }));

        try {
            const priceAnalysis = await geminiService.suggestPrice(formData.description, formData.location);
            setAiFeatures(prev => ({ ...prev, priceAnalysis }));
            setFormData(prev => ({ ...prev, price: priceAnalysis.suggestedPrice.toString() }));
        } catch (error) {
            console.error('Error optimizing price:', error);
            alert('Failed to optimize price. Please try again.');
        } finally {
            setAiFeatures(prev => ({ ...prev, isGeneratingPrice: false }));
        }
    };

    // AI Story Generation
    const generateStory = async () => {
        if (!formData.name || !formData.description) {
            alert('Please enter product name and description first');
            return;
        }

        setAiFeatures(prev => ({ ...prev, isGeneratingStory: true }));

        try {
            const story = await geminiService.expandStory(
                `Product: ${formData.name}. Description: ${formData.description}`,
                formData.storyWordCount
            );
            setFormData(prev => ({ ...prev, story }));
        } catch (error) {
            console.error('Error generating story:', error);
            alert('Failed to generate story. Please try again.');
        } finally {
            setAiFeatures(prev => ({ ...prev, isGeneratingStory: false }));
        }
    };

    // AI Image Generation
    const generateImage = async () => {
        if (!formData.name || !formData.description) {
            alert('Please enter product name and description first');
            return;
        }

        setAiFeatures(prev => ({ ...prev, isGeneratingImage: true }));

        try {
            // First, generate an optimized prompt based on product details
            const promptAnalysis = `Analyze this product and create a detailed, professional image generation prompt:
            
            Product Name: "${formData.name}"
            Description: "${formData.description}"
            Category: "${formData.category}"
            ${formData.story ? `Story Context: ${formData.story.substring(0, 300)}` : ''}
            
            Create a detailed prompt for generating a high-quality product image that includes:
            1. Product appearance and key features
            2. Professional photography style (e.g., studio lighting, clean background)
            3. Composition and angle that best showcases the product
            4. Color scheme and aesthetic that matches the product category
            5. Any relevant props or context that enhance the product presentation
            
            Return only the optimized prompt text, no explanations.`;

            const optimizedPrompt = await geminiService.generateText(promptAnalysis);
            setAiFeatures(prev => ({ ...prev, generatedPrompt: optimizedPrompt }));

            // Then generate the image using the optimized prompt
            const imageUrl = await geminiService.generateImage(optimizedPrompt);
            setAiFeatures(prev => ({ ...prev, generatedImage: imageUrl }));
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setAiFeatures(prev => ({ ...prev, isGeneratingImage: false }));
        }
    };

    // AI Social Media Post Generation
    const generateSocialPost = async (platform) => {
        if (!formData.story) {
            alert('Please generate a story first');
            return;
        }

        setAiFeatures(prev => ({ ...prev, isGeneratingSocialPost: true }));

        try {
            const socialPost = await geminiService.generateSocialPost(formData.story, platform);
            setAiFeatures(prev => ({
                ...prev,
                socialPosts: {
                    ...prev.socialPosts,
                    [platform]: socialPost
                }
            }));
            setSocialPreview({ platform, isVisible: true });
        } catch (error) {
            console.error('Error generating social post:', error);
            alert('Failed to generate social post. Please try again.');
        } finally {
            setAiFeatures(prev => ({ ...prev, isGeneratingSocialPost: false }));
        }
    };

    // Publish to Social Media
    const publishToSocial = async (platform) => {
        // In a real implementation, this would integrate with social media APIs
        alert(`Publishing to ${platform}... (This would integrate with ${platform} API in production)`);
        setSocialPreview({ platform: null, isVisible: false });
    };

    // Handle story word count change
    const handleStoryWordCountChange = (newWordCount) => {
        setFormData(prev => ({ ...prev, storyWordCount: newWordCount }));
        if (formData.story) {
            generateStory(); // Regenerate with new word count
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const removeTag = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Handle image upload from device
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, { url: imageUrl, source: 'upload', name: file.name }]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image URL input
    const handleImageUrlAdd = () => {
        if (formData.imageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, { url: prev.imageUrl, source: 'url', name: 'URL Image' }],
                imageUrl: ''
            }));
        }
    };

    // Remove image from gallery
    const removeImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Add AI generated image to gallery
    const addAiImageToGallery = () => {
        if (aiFeatures.generatedImage) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, {
                    url: aiFeatures.generatedImage,
                    source: 'ai',
                    name: 'AI Generated',
                    prompt: aiFeatures.generatedPrompt
                }]
            }));
            setAiFeatures(prev => ({ ...prev, generatedImage: null, generatedPrompt: '' }));
        }
    };
    return (
        <div className="p-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
                    <p className="text-slate-400">Create your product with AI-powered assistance</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Product Details */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                        placeholder="Describe your product"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                                        >
                                            <option value="">Select category</option>
                                            <option value="handmade">Handmade</option>
                                            <option value="art">Art & Collectibles</option>
                                            <option value="jewelry">Jewelry</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="home">Home & Living</option>
                                            <option value="toys">Toys & Games</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                            placeholder="Your location"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Tag Generator */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Tag className="w-5 h-5 mr-2 text-purple-400" />
                                    AI Tag Generator
                                </h2>
                                <button
                                    onClick={generateTags}
                                    disabled={aiFeatures.isGeneratingTags || !formData.name || !formData.description}
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {aiFeatures.isGeneratingTags ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Sparkles className="w-4 h-4 mr-2" />
                                    )}
                                    Generate Tags
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-slate-800/50 rounded-md border border-slate-600">
                                {formData.tags.length > 0 ? (
                                    formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full text-sm"
                                        >
                                            {tag}
                                            <button
                                                onClick={() => removeTag(index)}
                                                className="ml-2 text-purple-400 hover:text-purple-200"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-400 text-sm">AI will generate 7-10 relevant tags based on your product name and description</span>
                                )}
                            </div>
                        </div>

                        {/* AI Price Optimizer */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                                    AI Price Optimizer
                                </h2>
                                <button
                                    onClick={optimizePrice}
                                    disabled={aiFeatures.isGeneratingPrice || !formData.description}
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {aiFeatures.isGeneratingPrice ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <TrendingUp className="w-4 h-4 mr-2" />
                                    )}
                                    Optimize Price
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Your Cost Price</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                        placeholder="Enter cost price"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                            placeholder="Your location"
                                        />
                                    </div>
                                </div>
                            </div>

                            {aiFeatures.priceAnalysis && (
                                <div className="bg-slate-800/50 rounded-md p-4 space-y-3">
                                    <h3 className="text-white font-medium mb-3">AI Price Analysis</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Suggested Price:</span>
                                            <span className="text-green-400 font-semibold">${aiFeatures.priceAnalysis.suggestedPrice}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Platform Fee:</span>
                                            <span className="text-yellow-400">${aiFeatures.priceAnalysis.platformFee}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Delivery Fee:</span>
                                            <span className="text-blue-400">${aiFeatures.priceAnalysis.deliveryFee}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Profit Margin:</span>
                                            <span className="text-purple-400">{aiFeatures.priceAnalysis.profitMargin}%</span>
                                        </div>
                                    </div>
                                    {aiFeatures.priceAnalysis.competitorAnalysis && (
                                        <div className="mt-4 pt-3 border-t border-slate-700">
                                            <h4 className="text-white text-sm font-medium mb-2">Market Analysis</h4>
                                            <div className="text-xs text-slate-400 space-y-1">
                                                <p>Average Market Price: ${aiFeatures.priceAnalysis.competitorAnalysis.averagePrice}</p>
                                                <p>Price Range: ${aiFeatures.priceAnalysis.competitorAnalysis.priceRange.min} - ${aiFeatures.priceAnalysis.competitorAnalysis.priceRange.max}</p>
                                                <p>Market Trend: {aiFeatures.priceAnalysis.competitorAnalysis.marketTrend}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* AI Story Generator */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-cyan-400" />
                                    AI Story Generator
                                </h2>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={formData.storyWordCount}
                                        onChange={(e) => handleStoryWordCountChange(parseInt(e.target.value))}
                                        className="px-3 py-1 bg-slate-800 border border-slate-600 rounded-md text-white text-sm"
                                    >
                                        <option value={150}>150 words</option>
                                        <option value={300}>300 words</option>
                                        <option value={500}>500 words</option>
                                        <option value={750}>750 words</option>
                                    </select>
                                    <button
                                        onClick={generateStory}
                                        disabled={aiFeatures.isGeneratingStory || !formData.name || !formData.description}
                                        className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-md hover:from-cyan-700 hover:to-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {aiFeatures.isGeneratingStory ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                        )}
                                        Generate
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={formData.story}
                                onChange={(e) => handleInputChange('story', e.target.value)}
                                rows={8}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                placeholder="AI will generate an engaging story based on your product details..."
                            />

                            {formData.story && (
                                <div className="mt-2 text-xs text-slate-400">
                                    Word count: {formData.story.split(' ').length} words
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - AI Features */}
                    <div className="space-y-6">
                        {/* AI Image Generator */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Camera className="w-5 h-5 mr-2 text-pink-400" />
                                    AI Image Generator
                                </h2>
                                <button
                                    onClick={generateImage}
                                    disabled={aiFeatures.isGeneratingImage || !formData.name || !formData.description}
                                    className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-md hover:from-pink-700 hover:to-pink-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {aiFeatures.isGeneratingImage ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <Zap className="w-4 h-4 mr-2" />
                                    )}
                                    Generate Image
                                </button>
                            </div>

                            {/* Generated Prompt Display */}
                            {aiFeatures.generatedPrompt && (
                                <div className="mb-4 p-3 bg-slate-800/50 rounded-md border border-slate-600">
                                    <h4 className="text-white text-sm font-medium mb-2">AI Generated Prompt:</h4>
                                    <p className="text-slate-300 text-xs">{aiFeatures.generatedPrompt}</p>
                                </div>
                            )}

                            <div className="aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center">
                                {aiFeatures.generatedImage ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={aiFeatures.generatedImage}
                                            alt="Generated product"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-2 right-2 flex gap-2">
                                            <button
                                                onClick={addAiImageToGallery}
                                                className="px-3 py-1 bg-green-600 text-white rounded-md text-xs hover:bg-green-700"
                                            >
                                                Add to Gallery
                                            </button>
                                            <button
                                                onClick={() => setAiFeatures(prev => ({ ...prev, generatedImage: null, generatedPrompt: '' }))}
                                                className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700"
                                            >
                                                Discard
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <Camera className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                                        <p className="text-slate-400 text-sm">AI-generated image will appear here</p>
                                        <p className="text-slate-500 text-xs mt-1">AI will analyze your product details to create the perfect image</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* AI Social Media Generator */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <Users className="w-5 h-5 mr-2 text-orange-400" />
                                AI Social Media Posts
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <button
                                    onClick={() => generateSocialPost('instagram')}
                                    disabled={aiFeatures.isGeneratingSocialPost || !formData.story}
                                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-md hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Instagram className="w-5 h-5 mr-2" />
                                    Instagram
                                </button>
                                <button
                                    onClick={() => generateSocialPost('facebook')}
                                    disabled={aiFeatures.isGeneratingSocialPost || !formData.story}
                                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Facebook className="w-5 h-5 mr-2" />
                                    Facebook
                                </button>
                            </div>

                            {/* Social Media Previews */}
                            {Object.entries(aiFeatures.socialPosts).map(([platform, post]) => (
                                post && (
                                    <div key={platform} className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-white font-medium flex items-center">
                                                {platform === 'instagram' ? <Instagram className="w-4 h-4 mr-2" /> : <Facebook className="w-4 h-4 mr-2" />}
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
                                            </h3>
                                            <button
                                                onClick={() => setSocialPreview({ platform, isVisible: true })}
                                                className="text-slate-400 hover:text-white"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-slate-300 text-sm mb-2">{post.text}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {post.hashtags.map((hashtag, index) => (
                                                <span key={index} className="text-blue-400 text-xs">#{hashtag}</span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Upload Images */}
                        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
                            <h2 className="text-xl font-semibold text-white mb-4">Product Images</h2>

                            {/* Upload Options */}
                            <div className="space-y-4 mb-6">
                                {/* Device Upload */}
                                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                                    <p className="text-slate-400 mb-2">Upload from Device</p>
                                    <p className="text-slate-500 text-sm mb-3">JPG, PNG, WebP (Max 5MB)</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="inline-block px-4 py-2 bg-slate-800 text-slate-300 rounded-md cursor-pointer hover:bg-slate-700"
                                    >
                                        Choose File
                                    </label>
                                </div>

                                {/* URL Input */}
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                                        placeholder="Enter image URL"
                                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400"
                                    />
                                    <button
                                        onClick={handleImageUrlAdd}
                                        disabled={!formData.imageUrl.trim()}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add URL
                                    </button>
                                </div>
                            </div>

                            {/* Image Gallery */}
                            {formData.images.length > 0 && (
                                <div>
                                    <h3 className="text-white font-medium mb-3">Image Gallery ({formData.images.length})</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image.url}
                                                    alt={image.name}
                                                    className="w-full h-24 object-cover rounded-md border border-slate-600"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                                    <button
                                                        onClick={() => removeImage(index)}
                                                        className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <div className="absolute top-1 left-1">
                                                    <span className={`px-1 py-0.5 text-xs rounded ${image.source === 'ai' ? 'bg-purple-600 text-white' :
                                                        image.source === 'upload' ? 'bg-green-600 text-white' :
                                                            'bg-blue-600 text-white'
                                                        }`}>
                                                        {image.source === 'ai' ? 'AI' : image.source === 'upload' ? 'Upload' : 'URL'}
                                                    </span>
                                                </div>
                                                {image.prompt && (
                                                    <div className="absolute bottom-1 left-1 right-1">
                                                        <div className="bg-black/70 text-white text-xs p-1 rounded truncate">
                                                            Prompt: {image.prompt.substring(0, 50)}...
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Media Preview Modal */}
                {socialPreview.isVisible && socialPreview.platform && aiFeatures.socialPosts[socialPreview.platform] && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSocialPreview({ platform: null, isVisible: false })}>
                        <div className="bg-slate-900 rounded-lg max-w-md w-full mx-4 border border-slate-700" onClick={(e) => e.stopPropagation()}>
                            <div className="p-4 border-b border-slate-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-semibold flex items-center">
                                        {socialPreview.platform === 'instagram' ? <Instagram className="w-5 h-5 mr-2" /> : <Facebook className="w-5 h-5 mr-2" />}
                                        {socialPreview.platform.charAt(0).toUpperCase() + socialPreview.platform.slice(1)} Post Preview
                                    </h3>
                                    <button
                                        onClick={() => setSocialPreview({ platform: null, isVisible: false })}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            <div className="p-4">
                                {/* Mock Social Media Post */}
                                <div className={`${socialPreview.platform === 'instagram' ? 'bg-white' : 'bg-slate-100'} rounded-lg p-4 text-black`}>
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                            U
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">Your Shop Name</p>
                                            <p className="text-xs text-gray-500">2 minutes ago</p>
                                        </div>
                                    </div>

                                    {aiFeatures.generatedImage && (
                                        <img
                                            src={aiFeatures.generatedImage}
                                            alt="Product"
                                            className="w-full h-48 object-cover rounded-lg mb-3"
                                        />
                                    )}

                                    <p className="text-sm mb-2">{aiFeatures.socialPosts[socialPreview.platform].text}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {aiFeatures.socialPosts[socialPreview.platform].hashtags.map((hashtag, index) => (
                                            <span key={index} className="text-blue-600 text-xs">#{hashtag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => publishToSocial(socialPreview.platform)}
                                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-md hover:from-green-700 hover:to-green-800"
                                    >
                                        Publish to {socialPreview.platform.charAt(0).toUpperCase() + socialPreview.platform.slice(1)}
                                    </button>
                                    <button
                                        onClick={() => setSocialPreview({ platform: null, isVisible: false })}
                                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-md hover:from-purple-700 hover:to-purple-800 font-medium">
                        Publish Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;