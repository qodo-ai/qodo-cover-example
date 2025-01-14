package main

import (
	"os/exec"
	"strings"
	"testing"
)

func TestMainCLI(t *testing.T) {
	// Test 'add' command
	cmd := exec.Command("go", "run", "./main.go", "add", "TestTask")
	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("Failed to run add command: %v (%s)", err, string(out))
	}
	if !strings.Contains(string(out), "Task added") {
		t.Error("Expected 'Task added.' output")
	}
}
