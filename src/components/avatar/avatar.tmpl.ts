export default `
    <div
        class="avatar {{#if canChangeAvatar}}avatar_changable{{/if}}"
        style="{{size}}"
    >
        <img
            src="
                {{#if url}}
                    {{url}}
                {{/if}}"
            class="image"
        >
        {{#if canChangeAvatar}}
            <div class="avatar__before">
                Поменять <br/> аватар
            </div>
        {{/if}}
    </div>
`;
