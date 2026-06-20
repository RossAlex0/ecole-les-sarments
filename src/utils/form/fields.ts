export type FieldType = "text" | "textarea" | "checkbox" | "datetime" | "image" | "hidden";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  hint?: string;
  required?: boolean;
  defaultValue?: string | boolean;
  /** For `image` fields: bucket folder where the file is stored (e.g. "team"). */
  folder?: string;
  /** For `image` fields: companion field name holding the in-bucket path. */
  pathField?: string;
};

export type FormValues = Record<string, string | boolean>;

const pad = (n: number) => String(n).padStart(2, "0");

/** ISO string -> value for a <input type="datetime-local"> (local time). */
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Default form values for a "create" form. */
export function initialValues(fields: FieldDef[]): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    values[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
  }
  return values;
}

/** Maps an existing row to editable form values. */
export function rowToValues(row: Record<string, unknown>, fields: FieldDef[]): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    const raw = row[field.name];
    if (field.type === "checkbox") values[field.name] = Boolean(raw);
    else if (field.type === "datetime") values[field.name] = raw ? toLocalInput(String(raw)) : "";
    else values[field.name] = raw == null ? "" : String(raw);
  }
  return values;
}

/** Converts form values to the API payload (ISO dates, null for empty optionals). */
export function valuesToPayload(values: FormValues, fields: FieldDef[]): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = values[field.name];
    if (field.type === "checkbox") {
      payload[field.name] = Boolean(value);
    } else if (field.type === "datetime") {
      const str = String(value).trim();
      payload[field.name] = str ? new Date(str).toISOString() : null;
    } else {
      const str = String(value).trim();
      payload[field.name] = str === "" ? (field.required ? "" : null) : str;
    }
  }
  return payload;
}

/** Returns an error message if a required field is empty, otherwise null. */
export function validate(values: FormValues, fields: FieldDef[]): string | null {
  for (const field of fields) {
    if (field.required && field.type !== "checkbox" && String(values[field.name]).trim() === "") {
      return `Le champ « ${field.label} » est requis.`;
    }
  }
  return null;
}
