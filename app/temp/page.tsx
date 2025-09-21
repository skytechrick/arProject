"use client";
import React, { useState } from "react";

export type Comment = {
    id: string;
    author: string;
    text: string;
};

export type Post = {
    id: string;
    type: "image" | "video";
    url: string;
    caption?: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
};

const samplePosts = (): Post[] => [
    {
        id: "p1",
        type: "image",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80&auto=format&fit=crop",
        caption: "Sunset from the rooftop",
        likes: 217,
        liked: false,
        comments: [
            { id: "c1", author: "alex", text: "Beautiful shot!" },
            { id: "c2", author: "maya", text: "Where is this?" },
        ],
    },
    {
        id: "p2",
        type: "image",
        url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80&auto=format&fit=crop",
        caption: "Coffee & code ☕️",
        likes: 152,
        liked: false,
        comments: [{ id: "c3", author: "leo", text: "Need that mug" }],
    },
    {
        id: "p3",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        caption: "Exploring new places 🎥",
        likes: 304,
        liked: false,
        comments: [{ id: "c4", author: "nina", text: "Awesome vlog!" }],
    },
    {
        id: "p4",
        type: "image",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
        caption: "Walking the city",
        likes: 89,
        liked: false,
        comments: [],
    },
    {
        id: "p5",
        type: "image",
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80&auto=format&fit=crop",
        caption: "Morning coffee",
        likes: 45,
        liked: false,
        comments: [],
    },
];

export default function ProfilePage(): React.ReactElement {
    const [posts, setPosts] = useState < Post[] > (samplePosts());
    const [activeTab, setActiveTab] = useState <
        "posts" | "products" | "skills" | "about" | "friends"
        > ("posts");
    const [selectedPost, setSelectedPost] = useState < Post | null > (null);
    // commentInputs holds per-post draft comments shown under each post card
    const [commentInputs, setCommentInputs] = useState < Record < string, string>> ({});
    // modal-specific comment input
    const [modalComment, setModalComment] = useState("");

    function toggleLike(postId: string) {
        setPosts((prev) => {
            const updated = prev.map((p) =>
                p.id === postId
                    ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                    : p
            );
            // keep modal in sync if currently open
            setSelectedPost((prevSel) => (prevSel && prevSel.id === postId ? updated.find((x) => x.id === postId) || null : prevSel));
            return updated;
        });
    }

    function addCommentFromInput(postId: string, author = "You") {
        const text = (commentInputs[postId] || "").trim();
        if (!text) return;
        const newComment: Comment = { id: String(Date.now()), author, text };
        setPosts((prev) => {
            const updated = prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
            // sync modal if open
            setSelectedPost((prevSel) => (prevSel && prevSel.id === postId ? updated.find((x) => x.id === postId) || null : prevSel));
            return updated;
        });
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    }

    function addCommentFromModal(postId: string, author = "You") {
        const text = modalComment.trim();
        if (!text) return;
        const newComment: Comment = { id: String(Date.now()), author, text };
        setPosts((prev) => {
            const updated = prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p));
            setSelectedPost((prevSel) => (prevSel && prevSel.id === postId ? updated.find((x) => x.id === postId) || null : prevSel));
            return updated;
        });
        setModalComment("");
    }

    function openPostModal(postId: string) {
        const p = posts.find((x) => x.id === postId) || null;
        setSelectedPost(p);
        setModalComment("");
    }

    function closeModal() {
        setSelectedPost(null);
        setModalComment("");
    }

    function handleCommentInputChange(postId: string, value: string) {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left / Main Column */}
                <div className="lg:col-span-3">
                    {/* Header Banner */}
                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1503264116251-35a269479413?w=1600&q=80&auto=format&fit=crop"
                            alt="banner"
                            className="w-full h-40 object-cover opacity-40"
                        />
                        <div className="absolute inset-0 p-6 flex items-end">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80&auto=format&fit=crop"
                                        alt="avatar"
                                        className="w-28 h-28 rounded-full border-4 border-gray-900 object-cover shadow-md"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">Sagar Ghosh</h2>
                                    <p className="text-sm text-gray-300">Frontend engineer • Loves photography & travel</p>

                                    <div className="mt-3 flex gap-2">
                                        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded-md text-sm font-medium">Follow</button>
                                        <button className="bg-transparent border border-gray-700 px-3 py-1 rounded-md text-sm">Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-6 bg-gray-900 p-4 rounded-md shadow-sm">
                        <div className="flex gap-4 flex-wrap">
                            <button onClick={() => setActiveTab("posts")} className={`px-3 py-1 rounded-md ${activeTab === "posts" ? "bg-gray-800" : "bg-transparent"}`}>Posts</button>
                            <button onClick={() => setActiveTab("products")} className={`px-3 py-1 rounded-md ${activeTab === "products" ? "bg-gray-800" : "bg-transparent"}`}>Products</button>
                            <button onClick={() => setActiveTab("skills")} className={`px-3 py-1 rounded-md ${activeTab === "skills" ? "bg-gray-800" : "bg-transparent"}`}>Skills</button>
                            <button onClick={() => setActiveTab("about")} className={`px-3 py-1 rounded-md ${activeTab === "about" ? "bg-gray-800" : "bg-transparent"}`}>About</button>
                            <button onClick={() => setActiveTab("friends")} className={`px-3 py-1 rounded-md ${activeTab === "friends" ? "bg-gray-800" : "bg-transparent"}`}>Friends</button>
                        </div>

                        {/* Content for Tabs */}
                        <div className="mt-4">
                            {activeTab === "posts" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {posts.map((post) => (
                                        <article key={post.id} className="bg-gray-800 rounded-md overflow-hidden shadow">
                                            <div className="relative">
                                                {post.type === "image" ? (
                                                    <img src={post.url} alt={post.caption} className="w-full h-48 object-cover cursor-pointer" onClick={() => openPostModal(post.id)} />
                                                ) : (
                                                    <video src={post.url} controls className="w-full h-48 object-cover cursor-pointer" onClick={() => openPostModal(post.id)} />
                                                )}

                                                <div className="absolute top-2 right-2 flex gap-2">
                                                    <button onClick={() => toggleLike(post.id)} className="bg-black/50 px-2 py-1 rounded-md text-sm">{post.liked ? "♥" : "♡"} {post.likes}</button>
                                                </div>
                                            </div>

                                            <div className="p-3">
                                                <p className="text-sm mb-2">{post.caption}</p>

                                                <div className="flex items-center gap-2 mb-2">
                                                    <input
                                                        value={commentInputs[post.id] || ""}
                                                        onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                                                        placeholder="Add a comment..."
                                                        className="w-full bg-gray-700 rounded-md text-sm px-3 py-2"
                                                    />
                                                    <button onClick={() => addCommentFromInput(post.id)} className="px-3 py-1 bg-blue-600 rounded-md text-sm">Post</button>
                                                </div>

                                                <div className="text-xs text-gray-400">{post.comments.length} comments</div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {activeTab === "products" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-md bg-gray-800">Product 1 — Handmade prints</div>
                                    <div className="p-4 rounded-md bg-gray-800">Product 2 — Presets</div>
                                </div>
                            )}

                            {activeTab === "skills" && (
                                <div className="space-y-2">
                                    <div className="p-4 rounded-md bg-gray-800">React • TypeScript • Tailwind</div>
                                    <div className="p-4 rounded-md bg-gray-800">Photography • Photo editing</div>
                                </div>
                            )}

                            {activeTab === "about" && (
                                <div className="p-4 rounded-md bg-gray-800 space-y-2 text-sm">
                                    <p>👋 Hi, I’m <span className="font-semibold">Sagar</span>! I enjoy building web apps, exploring cities, and capturing memories through my lens.</p>
                                    <p>✨ Current focus: learning AR/VR, improving full-stack skills, and contributing to open source.</p>
                                </div>
                            )}

                            {activeTab === "friends" && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {["Harshita", "Karthik", "Steve", "Maya", "Alex", "Leo"].map((friend) => (
                                        <div key={friend} className="p-4 bg-gray-800 rounded-md text-center">
                                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop" className="w-16 h-16 rounded-full mx-auto mb-2" alt={friend} />
                                            <div className="text-sm">{friend}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & Visitors */}
                <aside className="space-y-6">
                    <div className="bg-gray-800 p-4 rounded-md text-center">
                        <div className="text-3xl font-bold">217</div>
                        <div className="text-sm text-gray-400">Profile Views</div>
                        <div className="mt-3 text-2xl font-semibold">15</div>
                        <div className="text-sm text-gray-400">Photos</div>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-md">
                        <h3 className="text-sm text-gray-300 mb-3">Visitors</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop" className="w-8 h-8 rounded-full" alt="v1" />
                                <span className="text-sm">Harshita</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80&auto=format&fit=crop" className="w-8 h-8 rounded-full" alt="v2" />
                                <span className="text-sm">Karthik</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1545996124-1e6f1a9b1d7e?w=100&q=80&auto=format&fit=crop" className="w-8 h-8 rounded-full" alt="v3" />
                                <span className="text-sm">Steve</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-md">
                        <h3 className="text-sm text-gray-300 mb-3">Recommended</h3>
                        <div className="space-y-3 text-xs text-gray-400">
                            <div className="flex gap-2 items-center">
                                <div className="w-12 h-8 bg-gray-700 rounded-md" />
                                <div>Prints for your wall</div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-12 h-8 bg-gray-700 rounded-md" />
                                <div>Photo editing presets</div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Modal for selected post */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-gray-900 rounded-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-0">
                            {selectedPost.type === "image" ? (
                                <img src={selectedPost.url} alt={selectedPost.caption} className="w-full h-full object-cover max-h-[80vh]" />
                            ) : (
                                <video src={selectedPost.url} controls className="w-full h-full object-cover max-h-[80vh]" />
                            )}
                        </div>

                        <div className="p-4 flex flex-col">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop" className="w-10 h-10 rounded-full" alt="avatar" />
                                <div>
                                    <div className="font-semibold">Sagar Ghosh</div>
                                    <div className="text-xs text-gray-400">2 hours ago</div>
                                </div>
                            </div>

                            <div className="mt-4 flex-1 overflow-auto">
                                <p className="text-sm mb-4">{selectedPost.caption}</p>

                                <div className="space-y-3">
                                    {selectedPost.comments.map((c) => (
                                        <div key={c.id} className="text-sm">
                                            <span className="font-semibold">{c.author}</span>{" "}
                                            <span className="text-gray-300">{c.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => toggleLike(selectedPost.id)} className="px-3 py-1 rounded-md bg-gray-800">{selectedPost.liked ? "♥" : "♡"} {selectedPost.likes}</button>
                                    <div className="flex-1">
                                        <input value={modalComment} onChange={(e) => setModalComment(e.target.value)} placeholder="Add a comment..." className="w-full bg-gray-700 rounded-md text-sm px-3 py-2" />
                                    </div>
                                    <button onClick={() => addCommentFromModal(selectedPost.id)} className="px-3 py-1 bg-blue-600 rounded-md">Post</button>
                                </div>
                            </div>

                            <div className="mt-3 text-xs text-gray-400">Click outside to close</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-8 text-gray-500 text-sm">© 2025 — A simple profile demo</footer>
        </div>
    );
}
