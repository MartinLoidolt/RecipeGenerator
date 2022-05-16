package at.kaindorf.ahif18.recipegenerator.beans.repository;

import at.kaindorf.ahif18.recipegenerator.beans.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
