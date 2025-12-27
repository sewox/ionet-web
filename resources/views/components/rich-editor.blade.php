{{-- 
    Rich Text Editor Component using TinyMCE
    Usage: <x-rich-editor name="content" :value="$model->content ?? ''" rows="10" />
    Note: Do NOT add 'required' attribute - it causes form submission issues with hidden textarea.
          Validation should be handled server-side in controllers.
--}}
@props(['name', 'value' => '', 'rows' => 10])

<div x-data="{ editorId: 'editor_{{ $name }}_' + Math.random().toString(36).substr(2, 9) }" x-init="
    $nextTick(() => {
        tinymce.init({
            selector: '#' + editorId,
            height: {{ $rows * 40 }},
            menubar: false,
            language: 'tr_TR',
            plugins: [
                'lists', 'link', 'code', 'table', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link | code | removeformat',
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; }',
            branding: false,
            promotion: false,
        });
    });
">
    <textarea 
        :id="editorId"
        name="{{ $name }}" 
        {{ $attributes->merge(['class' => 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y']) }}
    >{{ old($name, $value) }}</textarea>
</div>
