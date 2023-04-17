/* eslint-disable react/jsx-key */
import React, { useRef } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import Header from '../../components/Header';
import {
  ContactContainer,
  ContactInput,
  ContactLabel,
  ContactSocialContainer,
  ContactTextArea,
  ContactTitle,
} from './styled';
import { handleValidation } from '../../components/Credentials';
import { MdOutlineAlternateEmail, MdWhatsapp } from 'react-icons/md';
import { BsInstagram } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Contato() {
  const $nome = useRef(null);
  const $email = useRef(null);
  const $textArea = useRef(null);

  const navigate = useNavigate();

  function submitEmail(e) {
    e.preventDefault();

    const templateParams = {
      from_name: $nome.current.value,
      from_email: $email.current.value,
      message: $textArea.current.value,
    };

    emailjs
      .send(
        'service_9f4xnh2',
        'template_0vuvyh9',
        templateParams,
        'ghKXmxjHwUBZ1yUYa',
      )
      .then(toast.success('Email enviado com sucesso!'), navigate('/'))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Header />
      <ContactContainer onSubmit={(e) => submitEmail(e)}>
        <ContactTitle>Contate-nos</ContactTitle>

        <ContactLabel>
          Qual seu nome?
          <ContactInput
            type="text"
            placeholder="Mara VI Lindo..."
            ref={$nome}
          />
        </ContactLabel>

        <ContactLabel>
          Qual email?
          <ContactInput
            type="text"
            placeholder="maravilindo@email.com..."
            ref={$email}
            onChange={() => {
              handleValidation($email);
            }}
          />
        </ContactLabel>
        <small>Iremos entrar em contato através desse email ;)</small>

        <ContactLabel>
          Faça sua pergunta
          <ContactTextArea
            type="text"
            placeholder="Faça sua pergunta..."
            ref={$textArea}
            cols={5}
            rows={5}
          />
        </ContactLabel>

        <ButtonPrimary type="submit" mediaquery="600px">
          Enviar
        </ButtonPrimary>
        <ContactSocialContainer>
          <a href="">
            <MdOutlineAlternateEmail size={40} />
          </a>
          <a href="">
            <BsInstagram size={35} />
          </a>
          <a href="">
            <MdWhatsapp size={40} />
          </a>
        </ContactSocialContainer>
      </ContactContainer>
    </>
  );
}
