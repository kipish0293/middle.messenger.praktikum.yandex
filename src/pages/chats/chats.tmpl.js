export default `
    <div id="chats" class="chats_offer" style="display:flex; justify-content: space-between">
        <div class="chats_offer__chatlist">
            <div>
                <a href="" id="go-to-profile">Профиль \></a>
            </div>
            <ul class="chats_offer__chatitem">
                {{#each chatsList}}
                    <li class="chats_chatitem" id="chat_item_{{this.id}}">
                        {{{chatIcon}}}
                        <span>{{chatName}}</span>
                    </li>
                {{/each}}
            </ul>
        </div>
        <div class="chats_offer__chat">
            {{{chatComponent}}}
        </div>
    </div>
`;
