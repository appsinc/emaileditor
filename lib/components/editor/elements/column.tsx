import { ColorPicker } from "@/components/custom/color-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createId } from "@/utils";
import type { ReactNode } from "react";
import { useCallback } from "react";
import { z } from "zod";

export const ColumnSchema = z.object({
  id: z.string(),
  type: z.literal("column"),
  title: z.string().optional().default("Untitled column"),
  width: z.string().default("100%").optional(),
  backgroundColor: z.string().default("transparent"),
  horizontalPadding: z.number().default(5),
  verticalPadding: z.number().default(5),
  borderRadius: z.string().default("0px").optional(),
  children: z.array(z.any()).default([]),
});

export type ColumnSchemaType = z.infer<typeof ColumnSchema>;

export const columnDefaultValues = (
  props: Partial<ColumnSchemaType> = {},
): ColumnSchemaType => {
  return {
    id: createId(),
    type: "column",
    width: "100%",
    title: "Untitled column",
    backgroundColor: "#e9e9e9",
    horizontalPadding: 0,
    verticalPadding: 150,
    borderRadius: "5px",
    children: [],
    ...props,
  };
};

export const Column = ({
  id = columnDefaultValues().id,
  children,
  ...props
}: ColumnSchemaType & { children: ReactNode }) => {
  // Merge props with default values
  const mergedProps = {
    ...columnDefaultValues,
    ...props,
    id,
    children,
  };

  const paddingTop = mergedProps.verticalPadding / 2;
  const paddingRight = mergedProps.horizontalPadding / 2;
  const paddingBottom = mergedProps.verticalPadding / 2;
  const paddingLeft = mergedProps.horizontalPadding / 2;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr><td style="width: ${mergedProps.width}">
    <![endif]-->`,
        }}
      />

      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        role="presentation"
        width={mergedProps.width}
        style={{
          borderCollapse: "collapse",
          ["mso-table-lspace" as any]: "0pt",
          ["mso-table-rspace" as any]: "0pt",
          width: `${mergedProps.width} !important`,
          fontSize: "0px",
          lineHeight: "0px",
        }}
      >
        <tr>
          <td
            data-el-type="column"
            data-el-id={mergedProps.id}
            style={{
              paddingTop: `${paddingTop}px`,
              paddingRight: `${paddingRight}px`,
              paddingBottom: `${paddingBottom}px`,
              paddingLeft: `${paddingLeft}px`,
              backgroundColor: mergedProps.backgroundColor,
              borderRadius: mergedProps.borderRadius,
              ["mso-line-height-rule" as any]: "exactly",
            }}
          >
            {mergedProps.children}
          </td>
        </tr>
      </table>

      <div
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]>
      </td></tr></table>
    <![endif]-->`,
        }}
      />
    </>
  );
};

interface ColumnEditorProps extends ColumnSchemaType {
  onChange?: (values: Partial<ColumnSchemaType>) => void;
}

export const ColumnEditor = ({ onChange, ...props }: ColumnEditorProps) => {
  const handleChange = useCallback(
    (field: keyof ColumnSchemaType, value: string | number) => {
      onChange?.({
        [field]: value,
      });
    },
    [onChange],
  );

  return (
    <div className="space-y-5">
      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-title`} className="text-xs">
          Title
        </Label>
        <Input
          id={`${props.id}-title`}
          placeholder="Column title"
          type="text"
          className="h-7 text-sm"
          value={props.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-width`} className="text-xs">
          Width
        </Label>
        <Slider
          id={`${props.id}-width`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}%`}
          value={[parseInt(props.width || "100")]}
          onValueChange={(value: number[]) =>
            handleChange("width", value[0].toString() + "%")
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-background-color`} className="text-xs">
          Background color
        </Label>
        <ColorPicker
          color={props.backgroundColor}
          onChange={(color) => handleChange("backgroundColor", color.hex)}
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-horizontal-padding`} className="text-xs">
          Horizontal padding
        </Label>
        <Slider
          id={`${props.id}-horizontal-padding`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.horizontalPadding]}
          onValueChange={(value: number[]) =>
            handleChange("horizontalPadding", value[0])
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-vertical-padding`} className="text-xs">
          Vertical padding
        </Label>
        <Slider
          id={`${props.id}-vertical-padding`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[props.verticalPadding]}
          onValueChange={(value: number[]) =>
            handleChange("verticalPadding", value[0])
          }
        />
      </div>

      <div className="space-y-2 gap-2">
        <Label htmlFor={`${props.id}-border-radius`} className="text-xs">
          Border radius
        </Label>
        <Slider
          id={`${props.id}-border-radius`}
          min={0}
          max={100}
          step={1}
          showTooltip={true}
          tooltipContent={(value) => `${value}px`}
          value={[parseInt(props.borderRadius || "0")]}
          onValueChange={(value: number[]) =>
            handleChange("borderRadius", value[0].toString() + "px")
          }
        />
      </div>
    </div>
  );
};
