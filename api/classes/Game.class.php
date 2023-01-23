<?php
class Game implements JsonSerializable{
    
    private  $firstPlayerId;
    private $secondPlayerId;
    private $startDate;
    private $endDate;
    private $status;
    private $gameId;


    public function __construct() {
    
    }

    public function getFirstPlayerId() {
        return $this->firstPlayerId;
    }

    public function setFirstPlayerId($firstPlayerId) {
        $this->firstPlayerId = $firstPlayerId;
    }
    public function setSecondPlayerId($secondPlayerId) {
        $this->secondPlayerId = $secondPlayerId;
    }

    public function getSecondPlayerId() {
        return $this->secondPlayerId;
    }
    public function getStartDate() {
        return $this->startDate;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function setEndDate($endDate) {
        $this->startDate = $endDate;

    }
    public function setStatus($status) {
        $this->status = $status;
    }
    public function getStatus() {
        return $this->status;
    }

    public function getGameId() {
        return $this->gameId;
    }

    public function setGameId($gameId) {
        $this->gameId = $gameId;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->getGameId(),
            'player_1' => $this->getFirstPlayerId(),
            'player_2' => $this->getFirstPlayerId(),
            'start_date' => $this->getStartDate(),
            'end_date' => $this->getEndDate(),
            'status' => $this->getStatus()
        ];
    }

}