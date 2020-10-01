<template>
  <div class="row">
    <div class="col-md-12">
      <div class="input-group mt-4 mb-5">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="mt-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/tutorials/' + currentTutorial.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue"
import TutorialDataService from "../services/TutorialDataService"

export default {
  name: "tutorials-list",

  setup () {
    const data = reactive({
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    })

    function retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response) => {
          data.tutorials = response.data
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    function refreshList() {
      retrieveTutorials()
      data.currentTutorial = null
      data.currentIndex = -1
    }

    function setActiveTutorial(tutorial, index) {
      data.currentTutorial = tutorial
      data.currentIndex = index
    }

    function removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data)
          refreshList()
        })
        .catch((e) => {
          console.log(e)
        })
    }

    function searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          data.tutorials = response.data
          console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    onMounted(() => {
      retrieveTutorials()
    })

    return { ...toRefs(data), retrieveTutorials, refreshList, setActiveTutorial, removeAllTutorials, searchTitle }
  }
}
</script>

<style lang="scss" scope>
.list-group-item {
  &:hover {
    cursor: pointer;
  }
}

.badge {
  padding: .35rem .5rem;
}
</style>
