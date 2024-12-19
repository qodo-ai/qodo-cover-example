<?php
namespace MyApp;

use MyApp\Math\AdvancedOperations;

class Calculator {
    public function add($a, $b) {
        return $a + $b;
    }

    public function multiply($a, $b) {
        return $a * $b;
    }

    public function subtract($a, $b) {
        return $a - $b;
    }

    // Use the advanced operations class
    public function squareRoot($a) {
        $adv = new AdvancedOperations();
        return $adv->sqrt($a);
    }

    public function power($a, $b) {
        $adv = new AdvancedOperations();
        return $adv->power($a, $b);
    }

    public function factorial($n) {
        $adv = new AdvancedOperations();
        return $adv->factorial($n);
    }
}