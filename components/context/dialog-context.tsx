"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

/**
 * 얼럿, 컨펌 컨텍스트
 */

interface DialogState {
  isOpen: boolean
  title: string
  description: string
  onConfirm?: () => void
  onClose?: () => void
  openAlert: (
    title: string,
    description: string,
    onConfirm?: () => void,
    onClose?: () => void,
  ) => void
  openConfirm: (
    title: string,
    description: string,
    onConfirm?: () => void,
    onClose?: () => void,
  ) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogState | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogType, setDialogType] = useState("") // 얼럿 or 컨펌
  const [isOpen, setIsOpen] = useState(false) // 창 오픈여부
  const [title, setTitle] = useState("") // 제목
  const [description, setDescription] = useState("") // 내용
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>() // 확인 콜백. *주의* 사용 시 닫기 콜백도 자동 호출됨
  const [onClose, setOnClose] = useState<(() => void) | undefined>() // 닫기 콜백

  // 얼럿 다이얼로그 오픈 함수
  const openAlert = (
    title: string,
    description: string,
    onConfirm?: () => void,
    onClose?: () => void,
  ) => {
    setDialogType("alert")
    setTitle(title)
    setDescription(description)
    setOnConfirm(() => onConfirm)
    setOnClose(() => onClose)
    setIsOpen(true)
  }

  // 컨펌 다이얼로그 오픈 함수
  const openConfirm = (
    title: string,
    description: string,
    onConfirm?: () => void,
    onClose?: () => void,
  ) => {
    setDialogType("confirm")
    setTitle(title)
    setDescription(description)
    setOnConfirm(() => onConfirm)
    setOnClose(() => onClose)
    setIsOpen(true)
  }

  // 다이얼로그 닫기 함수
  const closeDialog = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) {
      onClose?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        title,
        description,
        onConfirm,
        onClose,
        openAlert,
        openConfirm,
        closeDialog,
      }}
    >
      {children}
      {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent size="xs">
          <DialogHeader className="dialog-header">
            <DialogTitle>{title || "알림"}</DialogTitle>
          </DialogHeader>
          <div className="dialog-content">
            {description}
          </div>
          <DialogFooter className="dialog-footer">
            {dialogType === "confirm" ? (
              <>
            <Button  asChild variant="primary" size="sm">
              <button onClick={() => {
                onConfirm?.()
                closeDialog()
              }}>확인</button>
            </Button>
            <Button  asChild variant="gray" size="sm">
              <button onClick={closeDialog}>취소</button>
            </Button>
            </>
          ) : (
            <Button  asChild variant="primary" size="sm">
              <button onClick={() => {
                onConfirm?.()
                closeDialog()
              }}>확인</button>
            </Button>
          )}
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title || "알림"}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="alert-footer">
            {dialogType === "confirm" ? (
              <>
                <AlertDialogAction asChild>
                  <Button asChild size="sm">
                    <button
                      onClick={() => {
                        onConfirm?.()
                        closeDialog()
                      }}
                    >
                      확인
                    </button>
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel asChild>
                  <Button asChild size="sm">
                    <button onClick={closeDialog}>취소</button>
                  </Button>
                </AlertDialogCancel>
              </>
            ) : (
              <AlertDialogAction asChild>
                <Button asChild size="sm">
                  <button
                    onClick={() => {
                      onConfirm?.()
                      closeDialog()
                    }}
                  >
                    확인
                  </button>
                </Button>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("다이얼로그가 정의되지 않았습니다.")
  }
  return context
}
