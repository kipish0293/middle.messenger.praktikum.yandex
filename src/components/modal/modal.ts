import './modal.scss';
import tmpl from './modal.tmpl';
import Block from '../../helpers/block';

// export default function modal() {
//   const template = Handlebars.compile(tmpl);
//   const result = template({
//     button: button({
      // type: 'button',
      // id: 'accept',
      // name: 'Применить',
//     }),
//   });

//   return result;
// }


export default class Modal extends Block {
  constructor(props: any) {
      super("div", props);
  }

    //         const avatarChangable = this.element.querySelector(".avatar_changable");
    //         if (avatarChangable !== null) {
    //             avatarChangable.addEventListener("click", () => {
    //                 // запуск модалки
    //                 const modalWindow = document.querySelector("#modal");
    //                 const modalOverlay = document.querySelector("#modal-overlay");
    //                 modalWindow?.classList.toggle("open");
    //                 modalOverlay?.classList.toggle("open");
    //             });
    //         }

    //         const closeModalBtn = this.element.querySelector("#close-modal-btn");
    //         if (closeModalBtn !== null) {
    //             closeModalBtn.addEventListener("click", () => {
    //                 // закрытие модалки
    //                 const modalWindow = document.querySelector("#modal");
    //                 const modalOverlay = document.querySelector("#modal-overlay");
    //                 modalWindow?.classList.toggle("open");
    //                 modalOverlay?.classList.toggle("open");
    //             });
    //         }

  render() {
      return this.compile(tmpl, { button: this.props!.button });
  }
}
