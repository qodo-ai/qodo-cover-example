<?php
namespace MyApp\Math;

class AdvancedOperations {
    public function sqrt($a) {
        if ($a < 0) {
            throw new \InvalidArgumentException("Cannot take sqrt of negative number");
        }
        return sqrt($a);
    }

    public function power($a, $b) {
        return pow($a, $b);
    }

    // Not tested yet: 
    public function factorial($n) {
        if ($n < 0) {
            throw new \InvalidArgumentException("No factorial for negative numbers");
        }
        if ($n === 0) return 1;
        return $n * $this->factorial($n-1);
    }
}