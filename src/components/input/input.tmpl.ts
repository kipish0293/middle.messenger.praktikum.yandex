export default `
    <div class="text-field">
        <label
            class="text-field__label"
            for="{{name}}"
        >
            {{label}}
        </label>
        <input
            class="text-field__input"
            type="{{type}}"
            name="{{name}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            {{disabled}}
            {{required}}
        >
    </div>
`;
