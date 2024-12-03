import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const {content} = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Frety 기타 코드 신청',
            html: `<h1>신청 코드</h1><h3>${content}</h3>`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({message: '메일 전송 성공'}, {status: 200});
    } catch (error) {
        console.error('Email sending failed:', error);
        return NextResponse.json({message: '메일 전송 실패'}, {status: 500});
    }
}
