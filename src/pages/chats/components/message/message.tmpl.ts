export default `
    {{#if userMessage}}
        <div class="message__right">
            <div class="message__content">
                <div>
                    {{content}}
                </div>
                <div class="message__date">
                    {{time}}
                </div>
            </div>
        </div>
    {{else}}
        <div class="message__left">
            <div class="message__content">
                <span>{{name}}</span>
                <div>
                    {{content}}
                </div>
                <div class="message__date">
                    {{time}}
                </div>
            </div>
        </div>
    {{/if}}
`;
