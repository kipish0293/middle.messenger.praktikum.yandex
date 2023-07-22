import './error500.scss'
import LinkButton from '../../components/linkButton';
import Block from '../../helpers/block';
import { changePathName } from '../../utils/changePatrhName';
import tmpl from './error500.tmpl';

class Error500 extends Block {
  constructor(props: any) {
      super("div", props);
  }

  render() {
      return this.compile(tmpl, { linkButton: this.props!.linkButton });
  }
}

const linkButton = new LinkButton({
  name: "Назад к чатам",
  events: {
      click: (event: Event): void => {
          event.preventDefault();
          changePathName("chats");
      },
  },
});

export default new Error500({
  linkButton,
  class: "screen-content-center"
});