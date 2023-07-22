export default `
    {{#if userMessage}}
        <div class="message__right">
            <div class="message__content">
                <div>
                    {{text}}
                </div>
                <div class="message__date">
                    {{date}}
                </div>
            </div>
        </div>
    {{else}}
        <div class="message__left">
            <div class="message__content">
                <span>{{name}}</span>
                <div>
                    {{text}}
                </div>
                <div class="message__date">
                    {{date}}
                </div>
            </div>
        </div>
    {{/if}}
`;
