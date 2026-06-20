import { MdInfoOutline } from "react-icons/md";
import SarmentsText from "@/components/ui/sarmentsText/SarmentsText";

type AdminInfoProps = {
  /** Optional heading shown above the text. */
  title?: string;
  children: React.ReactNode;
};

/** Directus-style info callout (blue left accent + info icon). */
export default function AdminInfo({ title, children }: AdminInfoProps) {
  return (
    <aside className="admin_info">
      <MdInfoOutline className="admin_info_icon" aria-hidden="true" />
      <div className="admin_info_body">
        {title && (
          <SarmentsText format="semi-title-medium" color="blue">
            {title}
          </SarmentsText>
        )}
        {children}
      </div>
    </aside>
  );
}
