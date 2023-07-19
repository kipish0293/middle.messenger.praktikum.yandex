export default `
    <div id="chats" class="chats_offer" style="display:flex; justify-content: space-between">
        <div class="chats_offer__chatlist">
            <div>
                {{{linkButton}}}
            </div>
            <ul class="chats_offer__chatitem">
                {{#each chatsList}}
                   {{{this}}}
                {{/each}}
            </ul>
        </div>
        <div class="chats_offer__chat">
            {{{chatComponent}}}
        </div>
    </div>
`;
