import './error404.scss'
import LinkButton from '../../components/linkButton';
import Block from '../../helpers/block';
import { changePathName } from '../../utils/changePatrhName';
import tmpl from './error404.tmpl';

class Error404 extends Block {
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

export default new Error404({
  linkButton
});