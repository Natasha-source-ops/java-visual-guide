public class WorkflowDemo {
    static void build() {
        System.out.println("1) Build: Kompilieren");
    }

    static void test() {
        System.out.println("2) Test: Unit-Tests");
    }

    static void packageArtifact() {
        System.out.println("3) Paket: Artefakt erstellt");
    }

    static void publish() {
        System.out.println("4) Teilen: Push nach GitHub");
    }

    public static void main(String[] args) {
        build();
        test();
        packageArtifact();
        publish();
    }
}
