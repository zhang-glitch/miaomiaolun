<template>
  <div class="login">
    <validate-form>
      <validate-input></validate-input>
      <validate-input></validate-input>
    </validate-form>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
import Footer from '../components/Footer.vue'

export default defineComponent({
  name: 'login',
  components: {
    ValidateForm,
    ValidateInput,
    Footer
  }
})
</script>

<style>

</style>