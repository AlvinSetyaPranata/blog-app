<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'blog:read', 'post:read'])]
    private ?int $id = null;
    
    #[Groups(['user:read', 'blog:read', 'post:read'])]
    #[ORM\Column(length: 255, unique: true)]
    private ?string $name = null;
    
    #[Groups(['user:read', 'blog:read', 'post:read'])]
    #[ORM\Column(length: 1)]
    private ?string $gender = null;
    
    #[Groups(['user:read', 'blog:read', 'post:read'])]
    #[ORM\Column]
    private ?int $age = null;
    
    #[Groups(['user:read', 'blog:read', 'post:read'])]
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date_registered = null;

    /**
     * @var Collection<int, Post>
     */
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): static
    {
        $this->gender = $gender;
        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;
        return $this;
    }

    public function getDateRegistered(): ?\DateTimeInterface
    {
        return $this->date_registered;
    }

    public function setDateRegistered(?\DateTimeInterface $date_registered): static
    {
        $this->date_registered = $date_registered;
        return $this;
    }

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        if ($this->date_registered === null) {
            $this->date_registered = new \DateTime(); // Auto-set before persisting
        }
    }

    
}
