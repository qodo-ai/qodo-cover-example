<?php
use MyApp\Math\AdvancedOperations;
use PHPUnit\Framework\TestCase;

class AdvancedOperationsTest extends TestCase {
    public function testSqrt() {
        $adv = new AdvancedOperations();
        $this->assertEquals(5, $adv->sqrt(25));
    }

    public function testPower() {
        $adv = new AdvancedOperations();
        $this->assertEquals(16, $adv->power(2, 4));
    }

    // We do not test factorial() on purpose, so coverage will not be 100%.
}