package tasks

import "fmt"

type Task struct {
	Title       string
	Description string
	Done        bool
}

type TaskManager struct {
	store Store
}

func NewTaskManager(s Store) *TaskManager {
	return &TaskManager{store: s}
}

func (tm *TaskManager) Add(t Task) error {
	return tm.store.Add(t)
}

func (tm *TaskManager) List() []Task {
	return tm.store.List()
}

func (tm *TaskManager) MarkDone(indexStr string) error {
	idx, err := parseIndex(indexStr)
	if err != nil {
		return err
	}

	tasks := tm.store.List()
	if idx < 0 || idx >= len(tasks) {
		return fmt.Errorf("invalid index")
	}

	t := tasks[idx]
	t.Done = true
	return tm.store.Update(idx, t)
}

func (tm *TaskManager) Remove(indexStr string) error {
	idx, err := parseIndex(indexStr)
	if err != nil {
		return err
	}

	tasks := tm.store.List()
	if idx < 0 || idx >= len(tasks) {
		return fmt.Errorf("invalid index")
	}

	// Assume the store has a Remove method not currently tested
	if remover, ok := tm.store.(interface{ Remove(int) error }); ok {
		return remover.Remove(idx)
	}
	return fmt.Errorf("store does not support removal")
}

func (tm *TaskManager) FindByTitle(title string) *Task {
	tasks := tm.store.List()
	for i := range tasks {
		if tasks[i].Title == title {
			return &tasks[i]
		}
	}
	return nil
}

func parseIndex(s string) (int, error) {
	var i int
	_, err := fmt.Sscan(s, &i)
	return i, err
}

func (tm *TaskManager) BulkAdd(tasksToAdd []Task) error {
	// Adds multiple tasks; if you don't test this, coverage will drop.
	for _, t := range tasksToAdd {
		if err := tm.store.Add(t); err != nil {
			return err
		}
	}
	return nil
}

func (tm *TaskManager) CountDone() int {
	// Counts how many tasks are done.
	// If not tested, it reduces coverage.
	tasks := tm.store.List()
	count := 0
	for _, t := range tasks {
		if t.Done {
			count++
		}
	}
	return count
}

func (tm *TaskManager) FindByDescription(desc string) []Task {
	// Returns all tasks whose descriptions contain the given substring.
	// Not testing this leaves uncovered logic.
	tasks := tm.store.List()
	var results []Task
	for _, t := range tasks {
		if t.Description == desc {
			results = append(results, t)
		}
	}
	return results
}

func (tm *TaskManager) MarkAllDone() error {
	// Marks all tasks as done. If not tested, uncovered.
	tasks := tm.store.List()
	for i, t := range tasks {
		if !t.Done {
			t.Done = true
			if err := tm.store.Update(i, t); err != nil {
				return err
			}
		}
	}
	return nil
}

func (tm *TaskManager) UndoDone(indexStr string) error {
	// Opposite of MarkDone; if not tested, also uncovered.
	idx, err := parseIndex(indexStr)
	if err != nil {
		return err
	}

	tasks := tm.store.List()
	if idx < 0 || idx >= len(tasks) {
		return fmt.Errorf("invalid index")
	}

	t := tasks[idx]
	if !t.Done {
		return nil // Already undone
	}
	t.Done = false
	return tm.store.Update(idx, t)
}
