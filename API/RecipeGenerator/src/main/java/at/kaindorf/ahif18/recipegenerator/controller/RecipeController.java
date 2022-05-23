package at.kaindorf.ahif18.recipegenerator.controller;

import at.kaindorf.ahif18.recipegenerator.beans.entities.Ingredient;
import at.kaindorf.ahif18.recipegenerator.beans.entities.Recipe;
import at.kaindorf.ahif18.recipegenerator.beans.entities.RecipeIngredient;
import at.kaindorf.ahif18.recipegenerator.beans.repository.IngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeIngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;


@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @PostConstruct
    public void SeedData() {
        ArrayList<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe.RecipeBuilder(
                "Butterkeks",
                "Backen mit Kinder macht immer Spaß. Hier das Rezept von den einfachen Butterkekse zum Nachbacken.",
                "https://www.gutekueche.at/storage/media/recipe/112673/resp/einfache-butterkekse___webp_939_626.webp")
                .addIngredient("Butter", "g", 100)
                .addIngredient("Mehl", "g", 200)
                .addIngredient("Milch", "ml", 50)
                .build());

        recipes.add(new Recipe.RecipeBuilder("Kuchen",
                "Dieses Zebrastreifen - Kuchen Rezept ist nicht nur ein Hingucker sondern auch ein Gaumenschmaus.",
                "https://www.gutekueche.at/storage/media/recipe/19549/resp/zebrastreifen-kuchen___webp_940_625.webp")
                .addIngredient("Zucker", "g", 22)
                .addIngredient("Mehl", "g", 69)
                .addIngredient("Schocko", "g", 42)
                .addIngredient("Ei", "ganze", 2)
                .build());

        recipes.add(new Recipe.RecipeBuilder("Chili sin carne",
                "Ein herzhaftes Chili sin Carne darf jeden Tag auf den Tisch. Das vegetarische Rezept schmeckt immer.",
                "https://www.gutekueche.at/storage/media/recipe/25565/resp/chili-sin-carne___webp_620_413.webp")
                .addIngredient("Kartofeln", "g", 400)
                .addIngredient("Cayennepfeffer", "brise", 1)
                .addIngredient("Gemüsesuppe", "ml", 200)
                .addIngredient("Öl", "EL", 1)
                .addIngredient("Tomaten", "g", 400)
                .addIngredient("Tomatenmark", "EL", 2)
                .addIngredient("Sellerie", "g", 60)
                .addIngredient("Paprika", "ganzer", 1)
                .addIngredient("Mais", "g", 200)
                .addIngredient("Kidneybohnen", "g", 300)
                .addIngredient("Knoblauchzehe", "ganze", 1)
                .addIngredient("Zwiebel", "ganze", 1)
                .addIngredient("Salz", "EL", 1)
                .build());

        recipeRepository.saveAll(recipes);
    }

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<Recipe>> AllRecipes() {
        Iterable<Recipe> iterableRecipes = recipeRepository.findAll();

        List<Recipe> recipesList = new ArrayList<>();

        iterableRecipes.forEach(recipesList::add);

        return ResponseEntity.ok().body(recipesList);
    }

    @RequestMapping("/{name}")
    @GetMapping(produces = "application/json")
    public ResponseEntity<Recipe> GetRecipeByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok().body(recipeRepository.findByName(name));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Recipe> PostRecipe(@RequestBody Recipe recipe) {
        try {
            for (RecipeIngredient recipeIngredient : recipe.getIngredients()) {
                Optional<Ingredient> optionalIngredient =
                        ingredientRepository.findByName(recipeIngredient.getIngredient().getName());
                if (optionalIngredient.isPresent()) {
                    recipeIngredient.setIngredient(optionalIngredient.get());
                }
            }
            recipeRepository.save(recipe);
            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping(consumes = "application/json")
    public ResponseEntity<Recipe> DeleteRecipe(@RequestBody Recipe recipe) {
        try {
            recipeRepository.deleteById(recipe.getRecipeId());
            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(consumes = "application/json")
    public ResponseEntity<Recipe> PutRecipe(@RequestBody Recipe recipeDTO) {
        try {

            if(recipeRepository.findById(recipeDTO.getRecipeId()).isPresent()) {
                recipeRepository.saveAndFlush(recipeDTO);
            } else {
                throw new NoSuchElementException();
            }

            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            System.out.println("ERROR PutRecipe");
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(produces = "application/json")
    @RequestMapping("/generate/{days}")
    public ResponseEntity<List<Recipe>> GetRecipesForTimespan(@PathVariable int days) {
        List<Recipe> recipes = new ArrayList<>();
        List<Recipe> allRecipes = new ArrayList<>();

        Random rand = new Random();

        for (int i = 0; i < days; i++) {
            int recipeAmount = allRecipes.size();

            if (recipeAmount == 0) {
                recipeRepository.findAll().forEach(allRecipes::add);
                recipeAmount = allRecipes.size();
            }

            int id = rand.nextInt(recipeAmount);

            recipes.add(allRecipes.get(id));
            allRecipes.remove(id);
        }

        return ResponseEntity.ok().body(recipes);
    }
}
