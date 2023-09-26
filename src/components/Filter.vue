<template>
    <div>
        <div>
            <select name="menu" id="menu" v-model="selected.value">
                <option value="about">About</option>
                <option value="team">Team</option>
                <option value="tokenomics">Tokenomics</option>
                <option value="tools">Tools</option>
            </select>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: "Filter",
    props: {
        value: String
    },
    setup(props, { emit }) {
        const selected = ref(props.value);

        watch(selected, (val) => {
            emit('input', val);
        });

        return { selected };
    }
}
</script>

<style>
  /* Add your styling for the filter here */
</style>
