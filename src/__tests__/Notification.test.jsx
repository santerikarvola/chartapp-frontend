import {render, screen, cleanup} from "@testing-library/react"
import Notification from "../components/Notification"
import {describe, it, expect, afterEach} from "vitest"
import "@testing-library/jest-dom/vitest"

afterEach(() => {
  cleanup()
})

describe("Notification", () => {

  it("renders a default notification", () => {
    render(<Notification />)
    expect(null)
  })

  it("renders a notification with a message", () => {
    render(<Notification message={"Testing, testing."}/>)
    expect(screen.getByText("Testing, testing.")).toBeInTheDocument()
  })

})