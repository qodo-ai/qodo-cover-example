package tasks

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"sync"
)

// Store interface remains the same
type Store interface {
	Add(Task) error
	List() []Task
	Update(int, Task) error
}

type FileStore struct {
	filename string
	mu       sync.Mutex
}

func NewFileStore(filename string) *FileStore {
	return &FileStore{
		filename: filename,
	}
}

func (s *FileStore) Add(t Task) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	tasks, err := s.loadTasks()
	if err != nil {
		return err
	}

	tasks = append(tasks, t)
	return s.saveTasks(tasks)
}

func (s *FileStore) List() []Task {
	s.mu.Lock()
	defer s.mu.Unlock()

	tasks, err := s.loadTasks()
	if err != nil {
		// If there's an error reading, assume empty list
		// (e.g. file not found)
		return []Task{}
	}
	return tasks
}

func (s *FileStore) Update(index int, t Task) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	tasks, err := s.loadTasks()
	if err != nil {
		return err
	}

	if index < 0 || index >= len(tasks) {
		return fmt.Errorf("index out of range")
	}

	tasks[index] = t
	return s.saveTasks(tasks)
}

func (s *FileStore) loadTasks() ([]Task, error) {
	// If file doesn't exist, return empty slice
	if _, err := os.Stat(s.filename); os.IsNotExist(err) {
		return []Task{}, nil
	}

	data, err := ioutil.ReadFile(s.filename)
	if err != nil {
		return nil, err
	}

	var tasks []Task
	if len(data) == 0 {
		return []Task{}, nil
	}

	if err := json.Unmarshal(data, &tasks); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (s *FileStore) saveTasks(tasks []Task) error {
	data, err := json.MarshalIndent(tasks, "", "  ")
	if err != nil {
		return err
	}

	return ioutil.WriteFile(s.filename, data, 0644)
}

func (s *FileStore) Remove(index int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	tasks, err := s.loadTasks()
	if err != nil {
		return err
	}

	if index < 0 || index >= len(tasks) {
		return fmt.Errorf("index out of range")
	}

	// Remove the element at index
	tasks = append(tasks[:index], tasks[index+1:]...)
	return s.saveTasks(tasks)
}
