<script>
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      todoList: [],
      completedClass: "completed",
      notCompletedClass: "not-completed",
      completedDefault: "completed-default",
    };
  },
  props: {
    headingText: String,
  },
  methods: {
    async getTodoList() {
      const response = await axios.get("http://localhost:3000/api/v1/todo");
      const todoList = response.data.todoList
        .map((todo) => {
          return {
            id: todo.id.S,
            title: todo.title.S,
            completed: todo.completed.BOOL,
            date: todo.date.S,
          };
        })
        .sort((a, b) => {
          return moment(b.date).isBefore(a.date) ? 1 : -1;
        });
      this.todoList = todoList;
    },
    isTodoCompleted(todo) {
      return todo.completed ? "completed" : "not completed";
    },
    todoButtonText(todo) {
      return todo.completed ? "Mark as not completed" : "Mark as completed";
    },
    async toggleCompletion(todo) {
      this.todoList = this.todoList.map((t) => {
        if (t.id === todo.id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });
      await axios.put(`http://localhost:3000/api/v1/todo/${todo.id}`, {
        completed: !todo.completed,
      });
    },
    async deleteTodoItem(todo) {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/todo/${todo.id}`
      );
      this.todoList = this.todoList.filter((t) => t.id !== todo.id);
      console.log(
        "file: HelloWorld.vue ~ line 38 ~ deleteTodoItem ~ response",
        response
      );
    },
    isCompleted(todo) {
      return todo.completed;
    },
    getDate(todo) {
      return moment(todo.date).format("LLL");
    },
    async addTodoItem(text) {
      const todo = {
        id: uuidv4(),
        title: text,
        completed: false,
        date: moment().format("LLL"),
      };
      this.todoList.push(todo);
      this.$refs["todo-input"].value = "";
      await axios.post("http://localhost:3000/api/v1/todo", todo);
    },
  },
  created() {
    this.getTodoList();
  },
};
</script>

<template>
  <div class="todo-list">
    <div class="todo-list-heading">{{ headingText }}</div>
    <input
      v-model="text"
      v-on:keyup.enter="addTodoItem(text)"
      class="input-text"
      ref="todo-input"
    />
    <div v-for="todo in this.todoList" :key="todo.id" class="todo-item">
      <div class="title">{{ todo.title }}</div>
      <div
        :class="[
          isCompleted(todo) ? completedClass : notCompletedClass,
          completedDefault,
        ]"
      >
        {{ isTodoCompleted(todo) }}
      </div>
      <div class="date-stamp">{{ getDate(todo) }}</div>
      <div class="button-container">
        <button @click="toggleCompletion(todo)" class="complete-button">
          {{ todoButtonText(todo) }}
        </button>
        <button @click="deleteTodoItem(todo)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  /* border: 1px solid black; */
  /* display: inline-block; */
  width: 100vh;
  font-family: monospace;
}

.todo-list-heading {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: #3eaf7c;
}
.todo-item {
  margin: 2rem;
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 5px;
  height: auto;
}
.title {
  font-size: 1.5em;
  font-weight: bold;
  display: block;
}
.button-container {
  margin-top: 1rem;
}
.complete-button {
  /* margin: 10px; */
  text-transform: uppercase;
  margin-right: 1rem;
}
.completed {
  background-color: darkseagreen;
}
.not-completed {
  background-color: crimson;
}
.completed-default {
  border-radius: 5px;
  padding: 0.5rem;
  width: 7rem;
  margin-top: 1rem;
}
.date-stamp {
  color: grey;
  position: relative;
  left: 37rem;
  top: -5rem;
}
.input-text {
  font-family: monospace;
  width: 92%;
  height: 3rem;
  font-size: 1.5rem;
  position: relative;
  left: 2rem;
}
button {
  width: auto;
  height: 45px;
  font-family: monospace;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #957dad;
  box-shadow: 0px 15px 20px #957dad;
  color: #fff;
  transform: translateY(-3px);
}
</style>
