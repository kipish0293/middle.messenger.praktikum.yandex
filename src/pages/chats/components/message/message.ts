import Handlebars from 'handlebars';
import tmpl from './message.tmpl';

type Message = {
    id: number,
    name: string,
    text: string,
    date: string
}

function message(
  {
    id,
    name,
    text,
    date,
  } : Message,
) {
  const template = Handlebars.compile(tmpl);
  const result = template({
    id, name, text, date,
  });
  return result;
}

export default message;
