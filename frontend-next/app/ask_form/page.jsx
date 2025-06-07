"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AskForm() {
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState({
        title: '',
        question: '',
        tags: [],
        ispublic: false,
    });
    const [warnings, setWarnings] = useState({
        title: '',
        question: '',
        tags: ''
    });

    const handleTagInput = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            if (tags.length < 5) {
                const newTags = [...tags, e.target.value];
                setTags(newTags);
                setForm({ ...form, tags: newTags });
                e.target.value = '';
            } else {
                alert("You can only add up to 5 tags.");
            }
        }
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
        setForm({ ...form, tags: newTags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hasWarnings = false;
        let newWarnings = { title: '', question: '', tags: '' };

        if (form.title === '') {
            newWarnings.title = 'Question title cannot be empty.';
            hasWarnings = true;
        }
        if (form.question.split(' ').length < 10) {
            newWarnings.question = 'Detailed explanation must be at least 10 words.';
            hasWarnings = true;
        }
        if (tags.length === 0) {
            newWarnings.tags = 'You must add at least one tag.';
            hasWarnings = true;
        }
        setWarnings(newWarnings);
        if (hasWarnings) return;

        const token = window.sessionStorage.getItem("token");
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/problem/ask`,
                form,
                {
                    headers: { 'Authorization': `${token}` }
                }
            );
            alert(res.data.message);
            if (res.data.success) router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-10 py-5 min-h-screen" style={{ backgroundColor: '#F2F2F2', color: '#000000' }}>
            <div className="text-3xl font-bold mb-3">Ask Question</div>

            <div className="mb-6 mt-5">
                <label className="block mb-2 text-sm font-medium">
                    Question Title <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    className="border rounded-lg block w-full p-2.5"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#B6B09F', color: '#000000' }}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                {warnings.title && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.title}</div>}
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">
                    Explain the question in detail <span className="text-red-600">*</span>
                </label>
                <textarea
                    rows="6"
                    className="block p-2.5 w-full text-sm rounded-lg border"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#B6B09F', color: '#000000' }}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
                {warnings.question && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.question}</div>}
            </div>

            <div className="my-5">
                <label className="block mb-2 text-sm font-medium">
                    Input Tags <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="border rounded-lg block w-full p-2.5 mb-2"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#B6B09F', color: '#000000' }}
                    onKeyDown={handleTagInput}
                />
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex items-center px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#EAE4D5', color: '#000000' }}>
                            {tag}
                            <button onClick={() => removeTag(index)} className="ml-2 text-red-600 font-bold">x</button>
                        </div>
                    ))}
                </div>
                {warnings.tags && <div className="text-red-500 text-xs font-semibold mt-1">{warnings.tags}</div>}
            </div>

            <div className="flex mb-4 items-start gap-3">
                <input
                    type="checkbox"
                    checked={form.ispublic}
                    onChange={(e) => setForm({ ...form, ispublic: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: '#B6B09F' }}
                />
                <div className="text-sm">
                    <label className="font-medium">Public the Question</label>
                    <p className="text-xs text-gray-600">Public questions will be shown on the dashboard of other users</p>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg text-sm font-medium"
                style={{
                    backgroundColor: '#B6B09F',
                    color: '#FFFFFF'
                }}
            >
                Ask a question
            </button>
        </div>
    );
}
