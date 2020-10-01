<template>
  {{currentTutorial}} | iskdhjksjd
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import router from '@/router'
import { reactive, onMounted, toRefs } from "vue"
import TutorialDataService from "@/services/TutorialDataService"

export default {
  name: "tutorial",

  setup () {
    const { currentRoute } = router
    // console.log('currentRoute ', currentRoute.value.params.id)
    // let currentTutorial = ref(currentRoute.value.params.id)
    // let message = ref('')

    const tutorial = reactive({
      currentTutorial: null,
      message: "",
    })

    function getTutorial(id) {
      console.log('========= ', id)
      TutorialDataService.get(id)
        .then((response) => {
          tutorial.currentTutorial = response.data
          console.log(tutorial.currentTutorial)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    function updatePublished() {
      const data = {
        id: tutorial.currentTutorial.id,
        title: tutorial.currentTutorial.title,
        description: tutorial.currentTutorial.description,
        published: status,
      }

      TutorialDataService.update(tutorial.currentTutorial.id, data)
        .then((response) => {
          tutorial.currentTutorial.published = status
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    function updateTutorial() {
      TutorialDataService.update(tutorial.currentTutorial.id, tutorial.currentTutorial)
        .then((response) => {
          console.log(response.data)
          tutorial.message = "The tutorial was updated successfully!"
        })
        .catch((e) => {
          console.log(e)
        })
    }

    function deleteTutorial() {
      TutorialDataService.delete(tutorial.currentTutorial.id)
        .then((response) => {
          console.log(response.data)
          //$router.push({ name: "tutorials" })
        })
        .catch((e) => {
          console.log(e)
        })
    }

    onMounted(() => {
      tutorial.message = ""
      getTutorial(currentRoute.value.params.id)
    })

    return { ...toRefs(tutorial), getTutorial, updatePublished, updateTutorial, deleteTutorial }
  }
}
</script>
