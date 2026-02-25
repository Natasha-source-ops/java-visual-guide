import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

public class WorkflowDemoSimpleTest {
    public static void main(String[] args) {
        PrintStream originalOut = System.out;
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        System.setOut(new PrintStream(out));

        WorkflowDemo.main(new String[]{});
        System.setOut(originalOut);

        String nl = System.lineSeparator();
        String expected =
                "1) Build: Kompilieren" + nl +
                "2) Test: Unit-Tests" + nl +
                "3) Paket: Artefakt erstellt" + nl +
                "4) Teilen: Push nach GitHub" + nl;

        assert expected.equals(out.toString()) : "Output falsch:\n" + out;
        System.out.println("Test passed");
    }
}
