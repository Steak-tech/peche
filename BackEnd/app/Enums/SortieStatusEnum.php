<?php

namespace App\Enums;
enum SortieStatusEnum: string
{
    case PENDING = "pending";
    case COMPLETED = 'completed';
    case CANCELED = 'canceled';

    public function getIcon (): string
    {
        return match($this)
        {
            self::PENDING => 'hourglass',
            self::COMPLETED => 'check',
            self::CANCELED => 'xmark', };
        }
}
