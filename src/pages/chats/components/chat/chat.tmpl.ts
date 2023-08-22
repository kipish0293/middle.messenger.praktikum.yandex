export default `
    {{#if currentChatId}}
        <div class="chat_offer__header-avatar">
            {{{avatar}}}
            {{chatName}}
            <div class="chat_settings">
                {{{addUser}}}
                {{{deleteUser}}}
                {{{deleteChatById}}}
            </div>
        </div>
        <div class="chat_offer__messages-list">
            {{#each messages}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="chat_offer__chat-footer">
            {{{chatFooter}}}
        </div>
    {{else}}
        <div class="chat_offer__no-select">Выберите чат, чтобы написать сообщение</div>
    {{/if}}
`;
