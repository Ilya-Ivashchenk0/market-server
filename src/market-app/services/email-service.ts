import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer'
import { mailerPort } from '../utils/checkProd'

class EmailService {
  private transporter: Transporter<SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: mailerPort,
      secure: process.env.NODE_ENV !== 'production'
        ? false
        : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendVerificationMail(email: string, link: string) {
    await this.transporter.sendMail({ // отправка письма с помощью транспорта
      from: `${process.env.SMTP_USER}@yandex.ru`, // адрес отправителя
      to: email, // адрес получателя
      subject: 'Подтверждение адреса электронной почты почты', // тема письма
      text: '',
      html:
        `
          <table align="center" style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <tr>
              <td align="center">
                <img
                  style="width: 270px; height: 270px; border-radius: 50%;"
                  src="https://i.ibb.co/CMJ037T/73ea8357-262b-4e41-ae7b-ac021a063d16.jpg"
                  alt=""
                >
              </td>
            </tr>
            <tr>
              <td align="center">
                <h1 style="color: #333; font-size: 24px;">
                  Добро пожаловать!
                </h1>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-size: 16px;">
                  Спасибо за регистрацию на нашем сайте! Пожалуйста, подтвердите свой адрес электронной почты, нажав на ссылку ниже:
                </p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <a href="${link}" style="display: inline-block; color: #fff; background-color: #007BFF; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                  Подтвердить Email
                </a>
              </td>
            </tr>
            <tr>
              <td align="center">
                <p style="font-size: 14px; color: #888;">
                  Если вы не регистрировались на нашем сайте, пожалуйста проигнорируйте это письмо.
                </p>
              </td>
            </tr>
          </table>
        `
    })
  }
}

export default new EmailService()