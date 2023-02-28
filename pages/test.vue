<template>
    <div>
        <template-configurator></template-configurator>
        <dash-board-preview></dash-board-preview>
        <templates-table></templates-table>
    </div>
</template>

<script>
export default {
    middleware: "authenticated",
}
</script>