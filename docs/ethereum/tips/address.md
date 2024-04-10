# validate
https://ethereum.stackexchange.com/questions/1374/how-can-i-check-if-an-ethereum-address-is-valid

```go
func validCheckSum(s string) error {
    s = join(s[4:], s[:4])
    expanded, err := iso13616Expand(s)
    if err != nil {
        return err
    }
    checkSumNum, _ := new(big.Int).SetString(expanded, 10)
    if checkSumNum.Mod(checkSumNum, Big97).Cmp(Big1) != 0 {
        return ICAPChecksumError
    }
    return nil
}
```