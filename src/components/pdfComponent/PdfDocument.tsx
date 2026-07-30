import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type PdfDocumentProps = {
  report: string;
  generatedAt: string;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 45,
    fontSize: 10,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
  },

  header: {
    marginBottom: 25,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 10,
    color: "#4b5563",
  },

  content: {
    marginTop: 10,
  },

  reportText: {
    fontSize: 10,
    textAlign: "justify",
    lineHeight: 1.7,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 45,
    right: 45,
    textAlign: "center",
    fontSize: 8,
    color: "#6b7280",
  },
});

export default function PdfDocument({ report, generatedAt }: PdfDocumentProps) {
  return (
    <Document
      title="Reporte de calidad de software"
      subject="Análisis de métricas y tickets"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de calidad de software</Text>

          <Text style={styles.subtitle}>
            Fecha de generación: {generatedAt}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.reportText}>{report}</Text>
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
