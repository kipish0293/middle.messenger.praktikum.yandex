import './chat.scss';
import Handlebars from 'handlebars';
import tmpl from './chat.tmpl';
import message from '../message';

function chat({ id }: { id: number }) {
  const messages = [
    {
      id: 1,
      name: 'Андрей',
      text: 'ОГО!! очень круто!',
      date: new Date(2023, 6, 12, 10, 36).toLocaleTimeString().slice(0, -3),
    },
    {
      id: 2,
      name: 'Павел',
      text: 'Спасибо большое, было приятно познакомится!',
      date: new Date(2023, 6, 12, 10, 45).toLocaleTimeString().slice(0, -3),
    },
  ].map((mes) => message(mes));
  const template = Handlebars.compile(tmpl);
  return template({ chatId: id, messages });
}

export default chat;
