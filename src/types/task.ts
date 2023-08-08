export namespace TaskTypes {
  export interface Task {
    id: string
    performer: Performer | null
    author: Performer | null
    content: string
    createDate: string
    endDate: string
    isTaskGroup: boolean
    report: string | null
    state: string
    tasksTreeItems: Task[]
  }

  export interface Performer {
    displayName: string
    position: string | null
  }

  export type Expand = "expanded" | "unexpanded" | "idle"
}
