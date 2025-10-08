package com.example.backend.config;

import com.example.backend.entity.Memorial;
import com.example.backend.repository.MemorialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(MemorialRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Memorial> memorials = Arrays.asList(
                    createSwedish1(),
                    createSwedish2(),
                    createSwedish3(),
                    createSwedish4(),
                    createGerman1(),
                    createGerman2(),
                    createGerman3(),
                    createGerman4(),
                    createEnglish1(),
                    createEnglish2(),
                    createEnglish3(),
                    createEnglish4()
                );

                repository.saveAll(memorials);
                System.out.println("✅ Seeded " + memorials.size() + " memorial cases");
            }
        };
    }

    private Memorial createSwedish1() {
        Memorial m = new Memorial();
        m.setFirstName("Astrid");
        m.setLastName("Bergström");
        m.setBornDate(LocalDate.of(1945, 3, 12));
        m.setDeathDate(LocalDate.of(2024, 9, 28));
        m.setPlaceOfBirth("Stockholm, Sverige");
        m.setPlaceOfDeath("Uppsala, Sverige");
        m.setBiography("Astrid var en älskad lärare som ägnade sitt liv åt att utbilda barn i matematik och naturvetenskap. Hon var känd för sitt tålamod och sin förmåga att få även de mest osäkra eleverna att tro på sig själva. På fritiden älskade hon att vandra i svenska fjällen och måla akvareller.");
        m.setObituary("Med saknad tar vi farväl av vår älskade Astrid Bergström som stilla somnade in omgiven av sina närmaste. Hon lämnar efter sig ett stort tomrum men också många ljusa minnen hos alla som kände henne.");
        return m;
    }

    private Memorial createSwedish2() {
        Memorial m = new Memorial();
        m.setFirstName("Erik");
        m.setMiddleName("Johan");
        m.setLastName("Andersson");
        m.setBornDate(LocalDate.of(1962, 7, 22));
        m.setDeathDate(LocalDate.of(2024, 10, 5));
        m.setPlaceOfBirth("Göteborg, Sverige");
        m.setPlaceOfDeath("Göteborg, Sverige");
        m.setBiography("Erik var en hängiven fiskare och naturälskare som tillbringade varje ledig stund vid havet. Han arbetade som skeppsmekaniker i 35 år och var känd för sitt skratt och sina ändlösa sjömannahistorier. Hans passion för livet och hans generositet kommer att saknas djupt av familj och vänner.");
        m.setObituary("Vår älskade make, pappa och morfar Erik har lämnat oss efter en tids sjukdom. Han var vår klippa, vår glädje och vårt allt. Vi är tacksamma för alla år vi fick tillsammans.");
        return m;
    }

    private Memorial createSwedish3() {
        Memorial m = new Memorial();
        m.setFirstName("Linnea");
        m.setLastName("Svensson");
        m.setBornDate(LocalDate.of(2001, 11, 8));
        m.setDeathDate(LocalDate.of(2024, 8, 15));
        m.setPlaceOfBirth("Malmö, Sverige");
        m.setPlaceOfDeath("Lund, Sverige");
        m.setBiography("Linnea var en lysande ung själ med ett stort hjärta för djur och natur. Hon studerade veterinärmedicin och drömde om att arbeta med vilda djur. Hennes vänner beskrev henne som en solstråle som alltid fick andra att känna sig sedda och hörda. Hon älskade att spela gitarr och skriva egna låtar.");
        m.setObituary("Vår älskade dotter Linnea rycks alltför tidigt bort från oss. Hon hade så mycket kvar att ge och uppleva. Hennes ljus kommer att lysa vidare i alla våra hjärtan.");
        return m;
    }

    private Memorial createSwedish4() {
        Memorial m = new Memorial();
        m.setFirstName("Gunnar");
        m.setMiddleName("Bertil");
        m.setLastName("Lindqvist");
        m.setBornDate(LocalDate.of(1938, 1, 30));
        m.setDeathDate(LocalDate.of(2024, 9, 12));
        m.setPlaceOfBirth("Kiruna, Sverige");
        m.setPlaceOfDeath("Stockholm, Sverige");
        m.setBiography("Gunnar levde ett långt och händelserikt liv. Han arbetade i gruvan i Kiruna innan han flyttade söderut och startade eget företag. En storhjärtad man som alltid ställde upp för sina vänner och familj. Han var gift i 58 år med sin älskade Ingrid och tillsammans hade de tre barn, sju barnbarn och fyra barnbarnsbarn.");
        m.setObituary("I djup sorg meddelar vi att vår make, pappa, morfar och farfar Gunnar har gått bort efter ett långt och välfyllt liv. Han var vår stolthet och vår inspiration. Vila i frid, du kommer alltid att finnas i våra hjärtan.");
        return m;
    }

    private Memorial createGerman1() {
        Memorial m = new Memorial();
        m.setFirstName("Klaus");
        m.setMiddleName("Dieter");
        m.setLastName("Müller");
        m.setBornDate(LocalDate.of(1955, 6, 18));
        m.setDeathDate(LocalDate.of(2024, 10, 1));
        m.setPlaceOfBirth("München, Deutschland");
        m.setPlaceOfDeath("München, Deutschland");
        m.setBiography("Klaus war ein leidenschaftlicher Ingenieur bei BMW, der über 40 Jahre lang an der Entwicklung innovativer Automobiltechnologien arbeitete. Er war bekannt für seine Präzision, seinen Humor und seine Liebe zum FC Bayern München. In seiner Freizeit restaurierte er gerne alte Motorräder und verbrachte Zeit mit seinen Enkelkindern.");
        m.setObituary("In stiller Trauer nehmen wir Abschied von unserem geliebten Klaus. Er war ein wunderbarer Ehemann, Vater und Großvater. Seine Güte und sein Lachen werden uns für immer fehlen.");
        return m;
    }

    private Memorial createGerman2() {
        Memorial m = new Memorial();
        m.setFirstName("Helga");
        m.setLastName("Schmidt");
        m.setBornDate(LocalDate.of(1942, 9, 5));
        m.setDeathDate(LocalDate.of(2024, 9, 20));
        m.setPlaceOfBirth("Hamburg, Deutschland");
        m.setPlaceOfDeath("Hamburg, Deutschland");
        m.setBiography("Helga widmete ihr Leben der Musik. Als Klavierlehrerin inspirierte sie Generationen von Schülern und half vielen, ihre Liebe zur klassischen Musik zu entdecken. Sie war eine warmherzige Frau, die für ihre Apfelstrudel und ihre offene Tür bekannt war. Ihre größte Freude war es, mit ihrer Familie zusammen zu sein.");
        m.setObituary("Unsere geliebte Mutter und Oma Helga ist friedlich eingeschlafen. Sie hinterlässt eine große Lücke in unseren Herzen, aber auch unzählige schöne Erinnerungen. Ruhe in Frieden.");
        return m;
    }

    private Memorial createGerman3() {
        Memorial m = new Memorial();
        m.setFirstName("Anna");
        m.setMiddleName("Marie");
        m.setLastName("Fischer");
        m.setBornDate(LocalDate.of(1995, 4, 14));
        m.setDeathDate(LocalDate.of(2024, 7, 30));
        m.setPlaceOfBirth("Berlin, Deutschland");
        m.setPlaceOfDeath("Berlin, Deutschland");
        m.setBiography("Anna war eine talentierte Grafikdesignerin mit einer außergewöhnlichen Kreativität. Sie liebte es, durch ihre Kunst Geschichten zu erzählen und arbeitete für verschiedene gemeinnützige Organisationen. Ihre Freunde beschreiben sie als eine Person voller Energie, Mitgefühl und unbändiger Lebensfreude. Sie reiste gerne und träumte davon, die Welt zu verändern.");
        m.setObituary("Viel zu früh wurde uns unsere geliebte Tochter Anna entrissen. Ihr Licht, ihre Liebe und ihr Lachen werden für immer in unseren Herzen weiterleben. Wir sind dankbar für jeden Moment, den wir mit ihr teilen durften.");
        return m;
    }

    private Memorial createGerman4() {
        Memorial m = new Memorial();
        m.setFirstName("Werner");
        m.setLastName("Hoffmann");
        m.setBornDate(LocalDate.of(1950, 12, 3));
        m.setDeathDate(LocalDate.of(2024, 10, 3));
        m.setPlaceOfBirth("Frankfurt, Deutschland");
        m.setPlaceOfDeath("Köln, Deutschland");
        m.setBiography("Werner war Architekt aus Leidenschaft. Seine Gebäude prägen bis heute das Stadtbild von Köln. Er war ein Mann mit Vision, der Moderne und Tradition meisterhaft verband. Außerhalb seiner Arbeit war er ein begeisterter Weinsammler und Hobby-Koch, der es liebte, Freunde zu bewirten.");
        m.setObituary("Mit tiefer Trauer verabschieden wir uns von Werner, einem außergewöhnlichen Menschen, der uns mit seiner Weisheit, seinem Talent und seiner Großzügigkeit bereichert hat. Er wird unvergessen bleiben.");
        return m;
    }

    private Memorial createEnglish1() {
        Memorial m = new Memorial();
        m.setFirstName("Margaret");
        m.setMiddleName("Rose");
        m.setLastName("Thompson");
        m.setBornDate(LocalDate.of(1948, 5, 22));
        m.setDeathDate(LocalDate.of(2024, 9, 15));
        m.setPlaceOfBirth("London, United Kingdom");
        m.setPlaceOfDeath("Brighton, United Kingdom");
        m.setBiography("Margaret was a devoted nurse who spent 45 years caring for others in the NHS. She had a gentle spirit and was known for her compassion and unwavering dedication to her patients. Outside of work, she loved gardening, baking Victoria sponge cakes, and spending time with her five grandchildren at the seaside.");
        m.setObituary("We sadly announce the passing of our beloved Margaret, a wonderful mother, grandmother, and friend. She touched countless lives with her kindness and will be deeply missed by all who knew her. Rest in peace, dear Mum.");
        return m;
    }

    private Memorial createEnglish2() {
        Memorial m = new Memorial();
        m.setFirstName("James");
        m.setMiddleName("Patrick");
        m.setLastName("O'Connor");
        m.setBornDate(LocalDate.of(1967, 8, 10));
        m.setDeathDate(LocalDate.of(2024, 10, 2));
        m.setPlaceOfBirth("Dublin, Ireland");
        m.setPlaceOfDeath("Manchester, United Kingdom");
        m.setBiography("James was a passionate teacher and rugby coach who inspired young people throughout his career. He moved from Dublin to Manchester in his twenties and made it his home. Known for his infectious laugh and love of Irish music, he could always be found at the local pub on a Friday night, entertaining friends with his stories and guitar playing.");
        m.setObituary("It is with heavy hearts that we say goodbye to James, our beloved husband, father, and friend. His zest for life, his humor, and his generous heart will be remembered by all. May he rest in eternal peace.");
        return m;
    }

    private Memorial createEnglish3() {
        Memorial m = new Memorial();
        m.setFirstName("Emily");
        m.setLastName("Williams");
        m.setBornDate(LocalDate.of(1998, 2, 28));
        m.setDeathDate(LocalDate.of(2024, 8, 20));
        m.setPlaceOfBirth("Bristol, United Kingdom");
        m.setPlaceOfDeath("Bristol, United Kingdom");
        m.setBiography("Emily was a bright young soul with a passion for environmental activism and sustainable living. She was studying Environmental Science at university and dreamed of working to protect endangered species. Her friends describe her as fearless, compassionate, and always ready to stand up for what she believed in. She loved hiking, photography, and her rescue dog Luna.");
        m.setObituary("Our precious daughter Emily was taken from us far too soon. She had so much love to give and so many dreams yet to fulfill. Her spirit will live on in the hearts of everyone she touched. Forever in our thoughts.");
        return m;
    }

    private Memorial createEnglish4() {
        Memorial m = new Memorial();
        m.setFirstName("Robert");
        m.setMiddleName("Henry");
        m.setLastName("Davies");
        m.setBornDate(LocalDate.of(1935, 11, 12));
        m.setDeathDate(LocalDate.of(2024, 9, 25));
        m.setPlaceOfBirth("Cardiff, Wales");
        m.setPlaceOfDeath("Edinburgh, Scotland");
        m.setBiography("Robert lived a remarkable life spanning nearly nine decades. A proud Welshman, he served in the Royal Navy before becoming a history professor at the University of Edinburgh. He was a devoted husband to his late wife Elizabeth for 62 years, and together they raised four children. Robert loved poetry, whisky, and long walks in the Scottish Highlands.");
        m.setObituary("With profound sadness, we announce the passing of our father, grandfather, and great-grandfather Robert. He was a man of wisdom, dignity, and unwavering principle. His legacy lives on through his family and the many students he mentored. Rest peacefully, Dad.");
        return m;
    }
}
