"use client";
import { useState } from "react";
import { useMutation } from '@apollo/client/react';
import { CREATE_MESSAGE } from '../../../graphql/mutations';
import { Josefin_Sans } from "next/font/google";
import GetInRounded from "../../common/RoundedButton";
import { toast } from "sonner"
const josefinSans = Josefin_Sans({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    style: ["normal", "italic"]
});

interface FormProps {
    isTablet: boolean;
}

export default function Form({ isTablet }: FormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
    });

    const [createMessage, { loading, error, data }] = useMutation(CREATE_MESSAGE);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await createMessage({
                variables: formData
            });

            if (result.data) {
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    service: '',
                    message: ''
                });
                toast.success("Message sent successfully! 🎉", {
                    duration: 3000,
                    description: "Thank you for contacting me. I'll get back to you soon!"
                });
            }
        } catch (err) {
            console.error('Error sending message:', err);
            toast.error("Failed to send message", {
                duration: 4000,
                description: "Please try again or contact me directly via email."
            });
        }
    };

    return (
        <div className="mt-[20px] p-[0px_20px] w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                <div className={`flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                    <div className="flex items-center gap-2 pt-[20px]">
                        <p className="text-gray-400 text-[12px]">01</p>
                        <label htmlFor="name" className="text-[20px]">Таны нэр хэн бэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Oyunbat Bat *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                    <div className="flex items-center gap-2 pt-[20px]">
                        <p className="text-gray-400 text-[12px]">02</p>
                        <label htmlFor="email" className="text-[20px] ">Таны е-майл хаяг юу вэ?</label>
                    </div>
                    <input
                        type="email"
                        placeholder="oyunbat9958@gmail.com *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                    <div className="flex items-center gap-2 pt-[20px]">
                        <p className="text-gray-400 text-[12px]">03</p>
                        <label htmlFor="company" className="text-[20px]">Та ямар мэргэжилтэй вэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="software engineer *"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                    <div className="flex items-center gap-2 pt-[20px]">
                        <p className="text-gray-400 text-[12px]">04</p>
                        <label htmlFor="service" className="text-[20px]">Ямар байдлаар хамтарч ажиллахыг хүсэж байна вэ?</label>
                    </div>
                    <input
                        type="text"
                        placeholder="Web development , Designing...*"
                        className="ml-6 text-[18px]  border-none outline-none"
                        required
                        value={formData.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                    />
                </div>

                <div className={`flex flex-col gap-4 border-t border-gray-600 ${josefinSans.className}`}>
                    <div className="flex items-center gap-2 pt-[20px]">
                        <p className="text-gray-400 text-[12px]">05</p>
                        <label htmlFor="message" className="text-[20px]">Надад хэлэх зүйл байвал энэ хэсэгт бичиж үлдээгээрэй?</label>
                    </div>
                    <textarea
                        placeholder="Сайнуу Оюунбатаа, вебсайт хийдэг сайт мэдэх үү?...*"
                        className="ml-6 text-[18px] min-h-[100px] resize-none  border-none outline-none"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                    />
                </div>

                <div className="m-[20px_50px] relative">
                    <button
                        type="submit"
                        disabled={loading}
                        className="disabled:opacity-50"
                    >
                        <GetInRounded backgroundColor={"#2563EB"}>
                            <p className={`m-0 text-[18px] md:text-base font-light z-50 ${josefinSans.className} font-[500] relative`}>
                                {loading ? 'Илгээж байна...' : 'Илгээх!'}
                            </p>
                        </GetInRounded>
                    </button>
                </div>

                {error && <p className="text-red-500">{error.message}</p>}

            </form>
        </div>
    );
}