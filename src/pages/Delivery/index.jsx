/* eslint-disable react/jsx-key */
import React, { useRef } from 'react';
import { ButtonPrimary } from '../../components/Button/styled';
import Header from '../../components/Header';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  ContactContainer,
  ContactInput,
  ContactLabel,
  ContactTextArea,
  ContactTitle,
} from '../Contato/styled';
import { formatTel } from '../../components/Adm';

export default function Delivery() {
  const $nome = useRef(null);
  const $tel = useRef(null);
  const $textArea = useRef(null);

  const navigate = useNavigate();

  function submitEmail(e) {
    e.preventDefault();

    const templateParams = {
      from_name: $nome.current.value,
      from_email: $tel.current.value,
      message: $textArea.current.value,
    };

    emailjs
      .send(
        'service_9f4xnh2',
        'template_0vuvyh9',
        templateParams,
        'ghKXmxjHwUBZ1yUYa',
      )
      .then(toast.success('Iremos enviar o cardápio!'), navigate('/'))
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Header />
      <ContactContainer onSubmit={(e) => submitEmail(e)}>
        <ContactTitle>Delivery</ContactTitle>

        <ContactLabel>
          Qual seu nome?
          <ContactInput
            type="text"
            placeholder="Mara VI Lindo..."
            ref={$nome}
            required
          />
        </ContactLabel>

        <ContactLabel>
          Seu telefone para receber o cardápio do dia
          <ContactInput
            type="tel"
            name="tel"
            id=""
            onChange={() => formatTel(null, $tel)}
            ref={$tel}
            maxLength={15}
            placeholder="(xx) xxxxx-xxxx"
            title="Telefone (xx) xxxxx-xxxx"
            required
          />
        </ContactLabel>
        <small style={{ marginBottom: '15px' }}>
          Iremos entrar em contato através desse número ;)
        </small>

        <ContactLabel>
          Deseja perguntar algo ?
          <ContactTextArea
            type="text"
            placeholder="Faça sua pergunta..."
            ref={$textArea}
            cols={5}
            rows={5}
          />
        </ContactLabel>

        <ButtonPrimary
          type="submit"
          mediaquery="600px"
          style={{ marginBottom: '25px' }}
        >
          Enviar
        </ButtonPrimary>
      </ContactContainer>
    </>
  );
}
