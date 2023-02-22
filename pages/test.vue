<template>
    <div>
        <template-configurator></template-configurator>
        <dashboard-preview></dashboard-preview>
        <save-template-form></save-template-form>
        <template-table></template-table>
    </div>
</template>

<script>
export default {
    middleware: "authenticated",
}
</script>