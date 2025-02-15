import {
  ButtonSchema,
  ColumnSchema,
  ContainerSchema,
  HeadingSchema,
  HrSchema,
  ImgSchema,
  RowSchema,
  TextSchema,
} from "@/components/elements";
import { PLACEHOLDER_IMAGE, PLACEHOLDER_LOGO } from "@/const";
import { z } from "zod";

// Define element schemas
const ElementSchema = z.discriminatedUnion("type", [
  z.object({
    ...ButtonSchema.shape,
  }),
  z.object({
    ...HeadingSchema.shape,
  }),
  z.object({
    ...HrSchema.shape,
  }),
  z.object({
    ...ImgSchema.shape,
  }),
  z.object({
    ...TextSchema.shape,
    children: z.array(z.string()).optional(),
  }),
]);

export type ElementType = z.infer<typeof ElementSchema>;

// Column with children
export const ColumnWithChildrenSchema = ColumnSchema.extend({
  id: z.string(),
  type: z.literal("column"),
  children: z.array(ElementSchema),
});

export type ColumnWithChildrenType = z.infer<typeof ColumnWithChildrenSchema>;

// Row with children
export const RowWithChildrenSchema = RowSchema.extend({
  id: z.string(),
  type: z.literal("row"),
  children: z.array(ColumnWithChildrenSchema),
});

export type RowWithChildrenType = z.infer<typeof RowWithChildrenSchema>;

// Container with children
const ContainerWithChildrenSchema = ContainerSchema.extend({
  type: z.literal("container"),
  children: z.array(RowWithChildrenSchema),
});

// Font schema
const FontSchema = z.object({
  family: z.string().optional().default("Arial"),
  fallback: z.array(z.string()).optional().default(["Helvetica", "sans-serif"]),
  weight: z.array(z.number()).optional().default([400, 700]),
});

// Main template schema
export const TemplateSchema = z.object({
  title: z.string(),
  preview: z.string(),
  font: FontSchema,
  container: ContainerWithChildrenSchema,
});

export type TemplateSchemaType = z.infer<typeof TemplateSchema>;

// Example template with default values
export const defaultTemplate: TemplateSchemaType = {
  title: "Resend Product Updates",
  preview: "Latest features and improvements from Resend",
  font: {
    family: "Inter",
    fallback: ["Helvetica", "sans-serif"],
    weight: [400, 500, 600, 700],
  },
  container: {
    id: "container-1",
    type: "container",
    style: {
      backgroundColor: "#ffffff",
      maxWidth: "600px",
      paddingTop: "32px",
      paddingRight: "32px",
      paddingBottom: "32px",
      paddingLeft: "32px",
      borderRadius: "0px",
      borderColor: "#e5e7eb",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    children: [
      {
        id: "row-logo",
        type: "row",
        title: "Logo",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 0,
        children: [
          {
            id: "col-logo",
            type: "column",
            title: "Logo Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "logo",
                type: "image",
                src: "https://resend.com/static/logo-dark.svg",
                title: "Resend Logo",
                width: "120px",
                height: "auto",
                align: "left",
                shape: "square",
                spacing: 0,
              },
            ],
          },
        ],
      },
      {
        id: "row-intro",
        type: "row",
        title: "Intro Section",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 48,
        children: [
          {
            id: "col-intro",
            type: "column",
            title: "Intro Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "intro-heading",
                type: "heading",
                as: "h1",
                text: "Latest from Resend",
                color: "#000000",
                horizontalPadding: 0,
                verticalPadding: 0,
                horizontalMargin: 0,
                verticalMargin: 16,
                lineHeight: 1.2,
                fontWeight: "600",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
              },
            ],
          },
        ],
      },
      {
        id: "row-update-1",
        type: "row",
        title: "Update 1",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 24,
        children: [
          {
            id: "col-update-1",
            type: "column",
            title: "Update 1 Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "update-1-image",
                type: "image",
                src: "https://resend.com/static/posts/react-email-v2.png",
                title: "React Email 2.0",
                width: "100%",
                height: "auto",
                align: "left",
                shape: "rounded",
                spacing: 24,
              },
              {
                id: "update-1-heading",
                type: "heading",
                as: "h2",
                text: "React Email 2.0",
                color: "#000000",
                horizontalPadding: 0,
                verticalPadding: 0,
                horizontalMargin: 0,
                verticalMargin: 16,
                lineHeight: 1.4,
                fontWeight: "600",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
              },
              {
                id: "update-1-text",
                type: "text",
                html: "We're excited to announce React Email 2.0. Build and send emails using React components with improved performance, better developer experience, and new features.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.6,
                fontWeight: "400",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "15px",
                color: "#4b5563",
              },
            ],
          },
        ],
      },
      {
        id: "row-update-2",
        type: "row",
        title: "Update 2",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 24,
        children: [
          {
            id: "col-update-2",
            type: "column",
            title: "Update 2 Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "update-2-image",
                type: "image",
                src: "https://resend.com/static/posts/email-analytics.png",
                title: "Email Analytics",
                width: "100%",
                height: "auto",
                align: "left",
                shape: "rounded",
                spacing: 24,
              },
              {
                id: "update-2-heading",
                type: "heading",
                as: "h2",
                text: "Introducing Email Analytics",
                color: "#000000",
                horizontalPadding: 0,
                verticalPadding: 0,
                horizontalMargin: 0,
                verticalMargin: 16,
                lineHeight: 1.4,
                fontWeight: "600",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
              },
              {
                id: "update-2-text",
                type: "text",
                html: "Track email performance with comprehensive analytics. Monitor opens, clicks, and deliverability in real-time with our new analytics dashboard.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.6,
                fontWeight: "400",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "15px",
                color: "#4b5563",
              },
            ],
          },
        ],
      },
      {
        id: "row-update-3",
        type: "row",
        title: "Update 3",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 24,
        children: [
          {
            id: "col-update-3",
            type: "column",
            title: "Update 3 Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "update-3-image",
                type: "image",
                src: "https://resend.com/static/posts/api-reference.png",
                title: "API Improvements",
                width: "100%",
                height: "auto",
                align: "left",
                shape: "rounded",
                spacing: 24,
              },
              {
                id: "update-3-heading",
                type: "heading",
                as: "h2",
                text: "New API Reference",
                color: "#000000",
                horizontalPadding: 0,
                verticalPadding: 0,
                horizontalMargin: 0,
                verticalMargin: 16,
                lineHeight: 1.4,
                fontWeight: "600",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
              },
              {
                id: "update-3-text",
                type: "text",
                html: "We've revamped our API documentation with improved navigation, better examples, and comprehensive guides to help you integrate Resend faster.",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.6,
                fontWeight: "400",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "15px",
                color: "#4b5563",
              },
            ],
          },
        ],
      },
      {
        id: "row-cta",
        type: "row",
        title: "CTA Section",
        columns: "100",
        gap: 0,
        backgroundColor: "#f9fafb",
        horizontalPadding: 24,
        verticalPadding: 24,
        children: [
          {
            id: "col-cta",
            type: "column",
            title: "CTA Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "cta-text",
                type: "text",
                html: "Try Resend today",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.5,
                fontWeight: "500",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "16px",
                color: "#000000",
              },
              {
                id: "cta-button",
                type: "button",
                text: "Get started",
                fontFamily: "Inter, Helvetica, sans-serif",
                href: "https://resend.com",
                align: "left",
                width: "120px",
                height: 10,
                horizontalMargin: 16,
                verticalMargin: 16,
                backgroundColor: "#000000",
                color: "#ffffff",
                fontSize: "14px",
                borderRadius: 6,
              },
            ],
          },
        ],
      },
      {
        id: "row-footer",
        type: "row",
        title: "Footer",
        columns: "100",
        gap: 0,
        backgroundColor: "transparent",
        horizontalPadding: 0,
        verticalPadding: 32,
        children: [
          {
            id: "col-footer",
            type: "column",
            title: "Footer Column",
            width: "100%",
            backgroundColor: "transparent",
            horizontalPadding: 0,
            verticalPadding: 0,
            borderRadius: "0px",
            children: [
              {
                id: "footer-text",
                type: "text",
                html: "© 2024 Resend. All rights reserved.<br><a href='#' style='color: #6b7280; text-decoration: underline;'>Unsubscribe</a>",
                horizontalPadding: 0,
                verticalPadding: 0,
                lineHeight: 1.6,
                fontWeight: "400",
                fontFamily: "Inter, Helvetica, sans-serif",
                textAlign: "left",
                fontSize: "14px",
                color: "#6b7280",
              },
            ],
          },
        ],
      },
    ],
  },
};
