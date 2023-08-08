import React from 'react'
import { TaskTypes } from 'types/task'
import { dateConverter } from 'tools'
import Button from './Button'

interface GroupTaskProps {
  task: TaskTypes.Task
  renderTree: (treeData: TaskTypes.Task[]) => JSX.Element[]
  setExpandedState: React.Dispatch<React.SetStateAction<TaskTypes.Expand>>
  expandedState: TaskTypes.Expand
}

const GroupTask: React.FC<GroupTaskProps> = ({ task, renderTree, expandedState, setExpandedState }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { author, content, createDate, endDate, tasksTreeItems } = task

  const handleToggleOpen = () => {
    setExpandedState("idle")
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  React.useEffect(() => {
    setIsOpen((prev) => {
      if (expandedState === 'expanded') {
        return true
      }

      if (expandedState === 'unexpanded') {
        return false
      }

      return prev
    })
  }, [expandedState])

  return (
    <li>
      <div className="line">
        {/* Вертикальная линия (отображается, если у задачи есть дочерние задачи) */}
        {isOpen && <div className={tasksTreeItems.length ? 'vertical-line' : ''} />}

        {/* Кнопка для раскрытия/скрытия задачи (отображается, если у задачи есть дочерние задачи) */}
        {tasksTreeItems.length > 0 && (
          <div className="toggle">
            <Button onClick={handleToggleOpen}>{isOpen ? '-' : '+'}</Button>
          </div>
        )}

        {author && (
          <div>
            <b>{author.displayName}</b>, <span>{author.position}</span>
          </div>
        )}

        <div>
          <b>Резолюция:</b> {content}
        </div>

        {endDate && (
          <div>
            <span>
              Выполнить: с {dateConverter(createDate)} до {dateConverter(endDate)}
            </span>
          </div>
        )}
      </div>

      {/* Отображение дочерних задач (если задача открыта и у неё есть дочерние задачи) */}
      {isOpen && <ul>{renderTree(tasksTreeItems)}</ul>}
    </li>
  )
}

export default GroupTask
