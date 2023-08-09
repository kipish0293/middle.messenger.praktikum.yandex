export default `
    <div class="chats_offer__chatlist">
        <div class="chats_offer__profile">
            {{{createChat}}}
            {{{linkButton}}}
        </div>
        <div class="chats_offer__search">
            {{{search}}}
        </div>
        <ul class="chats_offer__chatitem">
            {{#each chatList}}
                {{{this}}}
            {{/each}}
        </ul>
    </div>
    <div class="chats_offer__chat">
        {{{chatComponent}}}
    </div>
    {{{modal}}}
`;
